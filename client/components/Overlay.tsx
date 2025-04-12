import { useCameraContext } from '@/shared/providers/camera.provider';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

export const Overlay = () => {
  const router = useRouter();
  const { setCameraActive } = useCameraContext();

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Pressable
        onPress={() => {
          setCameraActive(false);
          router.replace('/scanner');
        }}
        style={{
          position: 'absolute',
          top: 50,
          left: 20,
          padding: 10,
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 25,
        }}
      >
        <FontAwesome name="arrow-left" size={24} color="white" />
      </Pressable>
    </View>
  );
};
