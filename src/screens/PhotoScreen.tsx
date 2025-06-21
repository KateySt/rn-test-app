import React from 'react';
import {
  Alert,
  Button, Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera } from 'react-native-image-picker';
import CameraRoll from '@react-native-camera-roll/camera-roll';

export default function PhotoScreen() {
  const requestPermissions = async () => {
    try {
      const camera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonPositive: 'OK',
        },
      );

      console.log('CAMERA permission: ', camera);

      const write = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage',
          buttonPositive: 'OK',
        },
      );

      return write === 'granted';
    } catch (err) {
      console.warn('Permission error: ', err);
      return false;
    }
  };

  const takePhoto = async () => {
    const hasPermission =
      Platform.OS === 'android' ? await requestPermissions() : true;

    if (!hasPermission) {
      return;
    }

    await launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled photo capture');
        } else if (response.errorCode) {
          Alert.alert('Camera error', response.errorMessage || 'Unknown error');
        } else {
          const assetUri = response.assets?.[0]?.uri;

          if (assetUri && Platform.OS === 'ios') {
            try {
              await CameraRoll.save(assetUri, { type: 'photo' });
              Alert.alert('Saved to gallery!');
            } catch (err) {
              Alert.alert('Save failed', String(err));
            }
          }
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Photo</Text>
      <Button title="Take Photo" onPress={takePhoto} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
