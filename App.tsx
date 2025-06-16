/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigator.tsx";
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <NavigationContainer>
                <MainNavigator/>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
