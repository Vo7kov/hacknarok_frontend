import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, FlatList } from 'react-native';
import {
  Text,
  Button,
  Card,
  TextInput,
  Title,
  Paragraph,
  HelperText,
  ActivityIndicator,
} from 'react-native-paper';
import { useUserRole } from '@/shared/context/UserRoleContext';
import { theme } from '@/shared/hooks/useAppTheme';
import { useFocusEffect } from '@react-navigation/native';

type Event = {
  id: number;
  name: string;
  description: string;
  location: string;
  time: string;
  max_users: number;
  registered_users: number;
  password: string;
  aiMessage?: string;
  loadingAi?: boolean;
};

const CreateEventForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    time: '',
    max_users: '10',
    password: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(
        'http://172.20.10.6:8000/api/event/create?user_id=1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            user_id: '1',
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            location: formData.location,
            time: formData.time,
            max_users: parseInt(formData.max_users),
            password: formData.password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        location: '',
        time: '',
        max_users: '10',
        password: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={styles.formCard}>
      <Card.Title title="Create New Event" />
      <Card.Content>
        <TextInput
          label="Event Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Description"
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          style={styles.input}
          multiline
          numberOfLines={3}
          mode="outlined"
        />
        <TextInput
          label="Location"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Time (YYYY-MM-DD HH:MM)"
          value={formData.time}
          onChangeText={(text) => setFormData({ ...formData, time: text })}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Maximum Users"
          value={formData.max_users}
          onChangeText={(text) => setFormData({ ...formData, max_users: text })}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          style={styles.input}
          secureTextEntry
          mode="outlined"
        />
        {error ? <HelperText type="error">{error}</HelperText> : null}
        {success ? (
          <HelperText type="info">Event created successfully!</HelperText>
        ) : null}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={
            loading || !formData.name || !formData.location || !formData.time
          }
          style={styles.submitButton}
        >
          Create Event
        </Button>
      </Card.Content>
    </Card>
  );
};

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;

      const fetchEvents = async () => {
        setLoading(true);
        setError('');

        try {
          const response = await fetch(
            'http://172.20.10.6:8000/api/event/user/2',
            {
              headers: {
                user_id: '2',
              },
            },
          );

          if (!response.ok) {
            throw new Error('Failed to fetch events');
          }

          const data = await response.json();
          if (isMounted) {
            setEvents(data);
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err.message : 'An error occurred');
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      fetchEvents();

      return () => {
        isMounted = false;
      };
    }, []),
  );

  const fetchAiMessage = async (eventId: number) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === eventId
          ? { ...event, loadingAi: true, aiMessage: undefined }
          : event,
      ),
    );

    try {
      const response = await fetch(
        `http://172.20.10.6:8000/api/event/ai/${eventId}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch AI message');
      }
      const data = await response.json();
      const message = data.generated_text;

      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === eventId
            ? { ...event, aiMessage: message, loadingAi: false }
            : event,
        ),
      );
    } catch (err) {
      console.error('Error fetching AI message:', err);

      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                loadingAi: false,
                aiMessage: 'Error fetching message.',
              }
            : event,
        ),
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button mode="contained" onPress={() => setLoading(true)}>
          Retry
        </Button>
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No events found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={styles.eventCard}>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph style={styles.description}>{item.description}</Paragraph>
            <View style={styles.eventDetails}>
              <Text>📍 {item.location}</Text>
              <Text>🕒 {item.time}</Text>
              <Text>
                👥 {item.registered_users}/{item.max_users} participants
              </Text>
              <Text>🔒 Password: {item.password}</Text>
              {item.loadingAi && (
                <ActivityIndicator size="small" style={{ marginVertical: 5 }} />
              )}
              {item.aiMessage && (
                <Paragraph style={styles.aiMessageText}>
                  Viking Insight: {item.aiMessage}
                </Paragraph>
              )}
            </View>
            <Button
              mode="outlined"
              onPress={() => fetchAiMessage(item.id)}
              style={styles.aiButton}
              disabled={item.loadingAi}
            >
              {item.loadingAi ? 'Thinking...' : 'Get Viking Insight'}
            </Button>
          </Card.Content>
        </Card>
      )}
    />
  );
};

const EventsScreen = () => {
  const { userRole } = useUserRole();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        {userRole === 'admin' ? 'Event Management' : 'My Events'}
      </Text>

      {userRole === 'admin' ? <CreateEventForm /> : <EventList />}
    </View>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  aiButton: {
    marginTop: 10,
    borderColor: theme.colors.primary,
  },
  aiMessageText: {
    marginTop: 8,
    fontStyle: 'italic',
    color: theme.colors.primary,
    backgroundColor: '#e8eaf6',
    padding: 8,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  formCard: {
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  eventCard: {
    marginBottom: 12,
    elevation: 1,
  },
  description: {
    marginVertical: 8,
    color: '#555',
  },
  eventDetails: {
    marginTop: 8,
    gap: 4,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
