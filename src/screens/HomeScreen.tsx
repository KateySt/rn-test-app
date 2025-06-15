import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.score}>Score: 0</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    },
    score: {
        color: '#fff',
        position: 'absolute',
        top: 30,
        left: 20,
        fontSize: 18,
    },
});