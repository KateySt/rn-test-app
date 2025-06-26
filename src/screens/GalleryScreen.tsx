import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';

const imageUri = 'https://reactnative.dev/img/tiny_logo.png';
export default function GalleryScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PhotoDetail', { imageUri })}
      >
        <SharedElement id="photo">
          <Image source={{ uri: imageUri }} style={styles.image} />
        </SharedElement>
      </TouchableOpacity>
      <Text style={styles.label}>Tap to view</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
  },
});
