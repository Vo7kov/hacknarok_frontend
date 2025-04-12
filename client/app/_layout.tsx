import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';

import { StyleSheet, useColorScheme, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Overlay } from '@/components/Overlay';
import {
  CameraProvider,
  useCameraContext,
} from '@/shared/providers/camera.provider';
import { RunesGame } from '@/components/RunesGame';
import { UserRoleProvider } from '@/shared/context/UserRoleContext';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserRoleProvider>
      <CameraProvider>
        <RootLayoutNav />
      </CameraProvider>
    </UserRoleProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [permissions] = useCameraPermissions();
  const { cameraActive } = useCameraContext();
  const [qrData, setQrData] = useState<string | null>(null);

  const onBarcodeScanned = ({ data }: { data: string }) => {
    console.log(data);
    setQrData(data);
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>

      {permissions?.granted && cameraActive && (
        <>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={onBarcodeScanned}
          />

          <Overlay />

          {qrData && <RunesGame data={qrData} />}
        </>
      )}
    </ThemeProvider>
  );
}
