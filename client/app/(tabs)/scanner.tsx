import React, { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { View } from '@/shared/ui/Themed';
import { Button, Card, Text, Divider } from 'react-native-paper';
import { useCameraContext } from '@/shared/providers/camera.provider';

const Scanner: FC = () => {
  const { setCameraActive } = useCameraContext();
  const [permissions, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permissions?.granted) {
      setCameraActive(true);
    }
  }, [permissions]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Scanner Access" />
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            Scanner
          </Text>
          <Divider style={styles.divider} />
          <Text style={styles.description}>
            To continue, we need access to your device's camera.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            style={{ width: '100%' }}
            mode="contained"
            onPress={requestPermission}
          >
            {permissions?.granted ? 'Open camera' : 'Request Access'}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  card: {
    padding: 8,
    borderRadius: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    marginVertical: 12,
    color: '#555',
  },
  divider: {
    marginVertical: 8,
  },
});
