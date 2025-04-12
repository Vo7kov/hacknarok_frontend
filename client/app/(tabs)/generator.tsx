import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text, View } from '@/shared/ui/Themed';
import QRCodeGenerator from '@/components/QRCodeGenerator';

export default function QRGenerator() {
  const [event, setEvent] = useState<{
    id: string;
    name: string;
    creator_id: number;
    registered_users: number;
    max_users: number;
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://172.20.10.6:8000/api/event/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (
          Array.isArray(data) &&
          data.length > 0 &&
          data[0].id !== undefined
        ) {
          setEvent(data[1]);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Event Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event QR Code</Text>
      <View style={styles.qrcontainer}>
        <QRCodeGenerator value={event.description} size={200} />
      </View>
      <Text style={styles.description}>{event.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrcontainer: {
    height: 250,
    width: 250,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});
