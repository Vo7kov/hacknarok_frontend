import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { FC } from 'react';

interface QRCodeGeneratorProps {
  value?: string;
  size?: number;
}

const QRCodeGenerator: FC<QRCodeGeneratorProps> = ({ value = "DefaultValue", size = 100 }) => {
  // value: The string data you want to encode (e.g., your story ID or URL)
  // size: The width and height of the QR code in pixels

  if (!value) {
    // Don't render if there's no value to encode
    return null;
  }

  return (
    <View style={styles.container}>
      <QRCode
        value={value}
        size={size}
        // Optional props:
        // logo={require('./path/to/your/logo.png')} // Embed a logo
        // logoSize={30}
        // logoBackgroundColor='transparent'
        // backgroundColor='white' // QR code background
        // color='black' // QR code foreground (dots)
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Add some padding around the QR code
  }
});

export default QRCodeGenerator;

// --- How to use it in another component ---
// import QRCodeGenerator from './QRCodeGenerator';
//
// function MyScreen() {
//   const storyUrl = "yourapp://story/unique_story_id_123"; // Or your backend URL
//   return (
//     <View>
//       <Text>Scan this Rune:</Text>
//       <QRCodeGenerator value={storyUrl} size={200} />
//     </View>
//   );
// }