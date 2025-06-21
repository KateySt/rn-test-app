import React, {useEffect} from 'react';
import { Button, FlatList, PermissionsAndroid, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Contacts from 'react-native-contacts';
import {useNavigation} from "@react-navigation/native";
import PushNotification from 'react-native-push-notification';
import BackgroundService from 'react-native-background-actions';

const options = {
    taskName: 'Background Notification',
    taskTitle: 'Running background task',
    taskDesc: 'Sending notifications periodically',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    linkingURI: 'yourapp://home',
    parameters: {
        delay: 10000,
    },
};


export const sendLocalNotification = () => {
  console.log('Sending local notification');
  PushNotification.localNotification({
    channelId: 'default-channel-id',
    title: 'Reminder',
    message: 'Time to do something important!',
    playSound: true,
    soundName: 'default',
  });
};

const veryIntensiveTask = async (taskDataArguments: any) => {
    const { delay } = taskDataArguments;
    while (BackgroundService.isRunning()) {
        console.log('Running background task...');
        await new Promise(resolve => setTimeout(() => resolve(true), delay));
    }
};

const startBackgroundTask = async () => {
    if (!BackgroundService.isRunning()) {
        await BackgroundService.start(veryIntensiveTask, options);
        console.log('Background service started');
    }
};

const stopBackgroundTask = async () => {
    if (BackgroundService.isRunning()) {
        await BackgroundService.stop();
        console.log('Background service stopped');
    }
};

export default function HomeScreen() {
    const [contacts, setContacts] = React.useState<any[]>([]);
    const navigation = useNavigation<any>();

    useEffect(() => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
            .then((res) => {
                console.log('Permission: ', res);
                Contacts.getAll()
                    .then((contacts) => {
                        setContacts(contacts);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((error) => {
                console.error('Permission error: ', error);
            });
    }, []);

    const openContactModal = (contact: any) => {
      navigation.navigate('ContactModal', { contact });
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.contactItem} onPress={() => openContactModal(item)}>
            <Text style={styles.contactName}>
                {item.givenName} {item.familyName}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Contacts</Text>
            <Button title="Send Now" onPress={sendLocalNotification} />
            <Button title="Start Background Task" onPress={startBackgroundTask} />
            <Button title="Stop Background Task" onPress={stopBackgroundTask} />
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.recordID}
                renderItem={renderItem}
                ListEmptyComponent={<Text>No contacts found.</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    contactItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    contactName: {
        fontSize: 16,
    },
});