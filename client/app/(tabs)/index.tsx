import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/shared/ui/Themed';
import { Button, Card, Title } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useUserRole } from '@/shared/context/UserRoleContext';
import { theme } from '@/shared/hooks/useAppTheme';

const RoleSelectionScreen = () => {
  const { userRole, setUserRole } = useUserRole();
  const router = useRouter();

  const handleContinue = () => {
    if (userRole) {
      // Navigate to the appropriate screen based on role
      if (userRole === 'admin') {
        console.log('Admin role selected');
      } else {
        console.log('User role selected');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>Select how you want to use the application</Text>
      
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          onPress={() => setUserRole('admin')}
          style={[
            styles.cardWrapper,
            userRole === 'admin' && styles.selectedCard
          ]}
        >
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <FontAwesome name="user-secret" size={50} color={theme.colors.accent} />
              <Title style={styles.cardTitle}>Admin</Title>
              <Text style={styles.cardText}>
                Create and manage events, generate QR codes
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setUserRole('user')}
          style={[
            styles.cardWrapper,
            userRole === 'user' && styles.selectedCard
          ]}
        >
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <FontAwesome name="user" size={50} color={theme.colors.accent} />
              <Title style={styles.cardTitle}>User</Title>
              <Text style={styles.cardText}>
                Scan QR codes to join and participate in events
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={handleContinue}
        disabled={!userRole}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Continue
      </Button>
    </View>
  );
};

export default RoleSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.7,
  },
  cardsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  cardWrapper: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 15,
  },
  selectedCard: {
    borderColor: theme.colors.accent,
  },
  card: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 10,
  },
  cardTitle: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 18,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 12,
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 4,
  },
});