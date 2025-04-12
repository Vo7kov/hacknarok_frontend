import { StyleSheet } from 'react-native';

import { Text, View } from '@/shared/ui/Themed';
import QRCodeGenerator from '@/components/QRCodeGenerator';

const events = [
    {
      id: 'event1',
      description: 'This is a sample event.',
      passPhrase: 'Welcome123',
    },
  ];

export default function QRGenerator() {
    const event = events[0];

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Event QR Code</Text>
            <View style={styles.qrcontainer}>
                <QRCodeGenerator value={event.id} size={200}/> 
            </View>
        </View>
    )
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
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });