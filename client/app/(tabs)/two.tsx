import { StyleSheet } from 'react-native';

import { Text, View } from '@/shared/ui/Themed';
import { FC } from 'react';

const TabTwoScreen: FC = () => {
  return (
    <View>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>Tab Two Screen</Text>
    </View>
  );
};

export default TabTwoScreen;

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
