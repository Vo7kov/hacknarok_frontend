import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View as RNView,
} from 'react-native';
import { Text, View } from '@/shared/ui/Themed';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useUserRole } from '@/shared/context/UserRoleContext';
import QRCode from 'react-native-qrcode-svg';
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
};
import { theme } from '@/shared/hooks/useAppTheme';
import { FontAwesome } from '@expo/vector-icons';

export default function QRGenerator() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;

      const fetchEvents = async () => {
        if (!isMounted) return;

        setLoading(true);
        setError('');

        try {
          const response = await fetch(
            'http://172.20.10.6:8000/api/event/user/1',
            {
              headers: {
                user_id: '2', // User ID for fetching events
              },
            },
          );

          if (!response.ok) {
            throw new Error('Failed to fetch events');
          }

          const data = await response.json();
          if (isMounted) {
            setEvents(data);
            // Keep selected event if it still exists in fetched data
            if (selectedEvent) {
              const stillExists: Event | undefined = data.find(
                (e: Event) => e.id === selectedEvent.id,
              );
              if (!stillExists) {
                setSelectedEvent(null);
              }
            }
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

      // Cleanup function
      return () => {
        isMounted = false;
      };
    }, [selectedEvent]), // Include selectedEvent to properly handle updates
  );

  const deleteEvent = async (eventId: number) => {
    try {
      const response = await fetch(
        `http://172.20.10.6:8000/api/event/${eventId}?user_id=1`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Remove the deleted event from the state
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId),
      );
      if (selectedEvent?.id === eventId) {
        setSelectedEvent(null); // Deselect the event if it was selected
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  // Get QR code value from event data
  const getQRValue = () => {
    if (selectedEvent) {
      return JSON.stringify(selectedEvent);
    }
    return '';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event QR Code</Text>

      {selectedEvent ? (
        <>
          <RNView style={styles.qrcontainer}>
            <QRCode value={getQRValue()} size={200} />
          </RNView>
          <Text style={styles.eventName}>{selectedEvent.name}</Text>
          <Text style={styles.eventDetails}>
            Location: {selectedEvent.location} • Time: {selectedEvent.time}
          </Text>
        </>
      ) : (
        <Text style={styles.instructions}>
          Select an event below to generate its QR code
        </Text>
      )}

      <Text style={styles.sectionTitle}>Your Events</Text>

      <ScrollView style={styles.eventsList}>
        {events.length > 0 ? (
          events.map((event) => (
            <TouchableOpacity
              key={event.id}
              onPress={() => setSelectedEvent(event)}
              style={[
                styles.cardWrapper,
                selectedEvent?.id === event.id && styles.selectedCard,
              ]}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', backgroundColor: "#f8f3f9" }}>
                    <Title>{event.name}</Title>
                    <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => {
                      deleteEvent(event.id);
                    }}
                  >
                    <FontAwesome
                      name="trash-o"
                      size={20}
                      color="white"
                    />
                  </Button>
                  </View>

                  <Paragraph numberOfLines={2}>{event.description}</Paragraph>
                  <Paragraph>
                    👥 {event.registered_users}/{event.max_users} participants
                  </Paragraph>

                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noEvents}>No events found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  qrcontainer: {
    height: 240,
    width: 240,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    marginTop: 40,
  },
  roleText: {
    fontSize: 16,
    paddingBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  eventsList: {
    width: '100%',
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#6200ee',
  },
  card: {
    width: '100%',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 14,
    opacity: 0.7,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noEvents: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
    marginTop: 20,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 10,
  },
});
