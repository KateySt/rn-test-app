import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';

const OCRScreen = () => {
  const [photoUri, setPhotoUri] = useState<string>();
  const [recognizedText, setRecognizedText] = useState<string>('');

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel || !response.assets?.[0].uri) return;
      setPhotoUri(response.assets[0].uri);
      processOcr(response.assets[0].uri);
    });
  };

  const processOcr = async (uri: string) => {
    try {
      const result = await MlkitOcr.detectFromUri(uri);
      const text = result.map(r => r.text).join('\n');
      setRecognizedText(text);
    } catch (e) {
      Alert.alert('OCR Error', 'Failed to recognize text.');
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={pickImage} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      {recognizedText ? (
        <Text style={styles.textResult}>{recognizedText}</Text>
      ) : (
        <Text style={styles.placeholder}>No text recognized yet</Text>
      )}
    </View>
  );
};

export default OCRScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111' },
  image: { width: '100%', height: 200, marginTop: 16 },
  textResult: { color: '#0f0', marginTop: 16 },
  placeholder: { color: '#888', marginTop: 16, fontStyle: 'italic' },
});
