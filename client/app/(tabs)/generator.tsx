import React, { useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator, Image, View as RNView } from 'react-native';
import { Text, View } from '@/shared/ui/Themed';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { TextInput, Button } from 'react-native-paper';
import { useUserRole } from '@/shared/context/UserRoleContext';
const PlaceholderImage = require('@/assets/images/qr-code.png');

export default function QRGenerator() {
  
  const { userRole } = useUserRole();
  const [event, setEvent] = useState<{
    id: string;
    name: string;
    creator_id: number;
    registered_users: number;
    max_users: number;
    description: string;
  } | null>(null);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Event QR Code</Text>
      <Text style={styles.title}>Role: {userRole}</Text>
      
      <RNView style={styles.qrcontainer}>
          <Image 
            source={PlaceholderImage} 
            style={styles.qrImage}
            resizeMode="contain"
          />
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  qrcontainer: {
    height: 240,
    width: 240,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 20,
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
    width: '100%',
    paddingVertical: 6,
  }
});