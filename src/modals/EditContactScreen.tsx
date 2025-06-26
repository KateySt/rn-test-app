import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditContactScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Text>Edit screen for {contact.givenName}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
