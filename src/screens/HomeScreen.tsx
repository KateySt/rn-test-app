import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Send Now" onPress={sendLocalNotification} />
      <Button title="Start Background Task" onPress={startBackgroundTask} />
      <Button title="Stop Background Task" onPress={stopBackgroundTask} />
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
