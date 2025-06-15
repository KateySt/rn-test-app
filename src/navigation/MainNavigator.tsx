import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlayScreen from "../screens/PlayScreen.tsx";
import HomeDrawerNavigator from './HomeDrawerNavigator.tsx';
import HomeScreen from "../screens/HomeScreen.tsx";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Play" component={PlayScreen}/>
        </Tab.Navigator>
    );
}