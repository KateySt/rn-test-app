import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

export default function PhotoDetailScreen({ route }: any) {
  const { imageUri } = route.params;

  return (
    <View style={styles.container}>
      <SharedElement id="photo">
        <Image source={{ uri: imageUri }} style={styles.image} />
      </SharedElement>
    </View>
  );
}

PhotoDetailScreen.sharedElements = () => {
  return ['photo'];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
  },
});
