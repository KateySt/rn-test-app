import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from "../screens/PlayScreen.tsx";

const Drawer = createDrawerNavigator();

export default function HomeDrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Play" component={PlayScreen} />
        </Drawer.Navigator>
    );
}
