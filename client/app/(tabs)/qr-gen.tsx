import { StyleSheet } from 'react-native';

import { Text, View } from '@/shared/ui/Themed';
import QRCodeGenerator from '@/components/QRCodeGenerator';

export default function QRGenerator() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <QRCodeGenerator value="" size={200}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });