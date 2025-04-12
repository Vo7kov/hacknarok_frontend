import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { StyleSheet, useColorScheme } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Overlay } from '@/components/Overlay';
import {
  CameraProvider,
  useCameraContext,
} from '@/shared/providers/camera.provider';
import { UserRoleProvider } from '@/shared/context/UserRoleContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
            onBarcodeScanned={({ data }) => {
              console.log('Barcode scanned:', data);
            }}
          />

          <Overlay />
        </>
      )}
    </ThemeProvider>
  );
}
