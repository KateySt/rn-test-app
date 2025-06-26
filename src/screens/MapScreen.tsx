import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { WebView } from 'react-native-webview';

const MapScreen = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Cannot access location');
          return;
        }
      }
      Geolocation.getCurrentPosition(
          pos => {
            const { latitude, longitude } = pos.coords;
            setLocation({ latitude, longitude });
          },
          error => {
            console.error(error);
            Alert.alert('Error', 'Failed to get location');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestPermission();
  }, []);

  const generateHTML = () => {
    const lat = location?.latitude || 50.4501;
    const lng = location?.longitude || 30.5234;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Leaflet Map</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <style>
            html, body, #map { height: 100%; margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <script>
            const map = L.map('map').setView([${lat}, ${lng}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '© OpenStreetMap'
            }).addTo(map);
            L.marker([${lat}, ${lng}]).addTo(map).bindPopup("Вы здесь").openPopup();
          </script>
        </body>
      </html>
    `;
  };

  return (
      <View style={styles.container}>
        <WebView
            originWhitelist={['*']}
            source={{ html: generateHTML() }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />
      </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
