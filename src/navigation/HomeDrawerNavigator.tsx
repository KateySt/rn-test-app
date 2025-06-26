import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import BluetoothScreen from '../screens/BluetoothScreen.tsx';
import NFCScreen from '../screens/NFCScreen.tsx';
import OCRScreen from '../screens/OCRScreen.tsx';
import MediaGalleryScreen from '../screens/MediaGalleryScreen.tsx';
import ContactsScreen from '../screens/ContactsScreen.tsx';
import AudioNotesScreen from '../screens/AudioNotesScreen.tsx';
import MapScreen from '../screens/MapScreen.tsx';
import WebRTCScreen from '../screens/WebRTCScreen.tsx';

const Drawer = createDrawerNavigator();

export default function HomeDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="NFC" component={NFCScreen} />
      <Drawer.Screen name="Bluetooth" component={BluetoothScreen} />
      <Drawer.Screen name="OCR" component={OCRScreen} />
      <Drawer.Screen name="Audio Notes" component={AudioNotesScreen} />
      <Drawer.Screen name="Gallery" component={MediaGalleryScreen} />
      <Drawer.Screen name="Contacts" component={ContactsScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="WebRTCScreen" component={WebRTCScreen} />
    </Drawer.Navigator>
  );
}