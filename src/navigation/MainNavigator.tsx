import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlayScreen from '../screens/PlayScreen.tsx';
import HomeDrawerNavigator from './HomeDrawerNavigator.tsx';
import ComponentPlaygroundScreen from '../screens/ComponentPlaygroundScreen.tsx';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeDrawerNavigator} />
      <Tab.Screen name="Playground" component={ComponentPlaygroundScreen} />
      <Tab.Screen name="Play" component={PlayScreen} />
    </Tab.Navigator>
  );
}
