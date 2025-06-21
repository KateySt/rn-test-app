/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/notification/PushNotificationConfig';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import MainNavigator from './src/navigation/MainNavigator.tsx';
import ContactModal from './src/modals/ContactModal.tsx';
import EditContactScreen from './src/modals/EditContactScreen.tsx';
import PhotoDetailScreen from './src/screens/PhotoDetailScreen.tsx';
import GalleryScreen from './src/screens/GalleryScreen.tsx';

const RootStack = createNativeStackNavigator();
const SharedStack = createSharedElementStackNavigator();

function SharedStackNavigator() {
  return (
    <SharedStack.Navigator initialRouteName="Gallery">
      <SharedStack.Screen name="Gallery" component={GalleryScreen} />
      <SharedStack.Screen
        name="PhotoDetail"
        component={PhotoDetailScreen}
        options={{ headerShown: false }}
      />
    </SharedStack.Navigator>
  );
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Main"
            component={MainNavigator}
            options={{ headerShown: false }}
          />

          <RootStack.Screen
            name="GalleryStack"
            component={SharedStackNavigator}
            options={{ headerShown: true }}
          />

          <RootStack.Screen
            name="ContactModal"
            component={ContactModal}
            options={{ presentation: 'modal', headerShown: true }}
          />
          <RootStack.Screen
            name="EditContact"
            component={EditContactScreen}
            options={{ headerShown: true }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
