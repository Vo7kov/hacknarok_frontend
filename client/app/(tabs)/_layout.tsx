import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
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
  ];

  return (
    <Tabs>
      {tabs.map((tab) => {
        const { name, icon } = tab;

        return (
          <Tabs.Screen
            name={name}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name={icon} color={color} />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
