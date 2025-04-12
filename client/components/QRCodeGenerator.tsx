import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View } from 'react-native';

type QRCodeProps = {
  value: string;
  size: number;
};

const QRCodeGenerator: React.FC<QRCodeProps> = ({ value, size }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <QRCode value={value} size={size} />
    </View>
  );
};

export default QRCodeGenerator;