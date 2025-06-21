import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GalleryScreen from "../screens/GalleryScreen.tsx";

export default function ContactModal() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { contact } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{contact.givenName} {contact.familyName}</Text>
            <Button title="Gallery Screen" onPress={() => navigation.navigate('GalleryStack', { contact })} />
            <Button title="Edit Contact" onPress={() => navigation.navigate('EditContact', { contact })} />
            <Button title="Close" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        gap:16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});
