import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useTheme } from 'react-native-paper';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { colors } = useTheme();

  const tabs: {
    name: string;
    icon: React.ComponentProps<typeof FontAwesome>['name'];
  }[] = [
    {
      name: 'index',
      icon: 'home',
    },
    {
      name: 'scanner',
      icon: 'camera',
    },
    {
      name: 'generator',
      icon: 'qrcode',
    },
    {
      name: 'events',
      icon: 'calendar',
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      }}
    >
      {tabs.map((tab) => {
        const { name, icon } = tab;

        return (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon
                  name={icon}
                  color={focused ? colors.primary : 'gray'}
                />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
