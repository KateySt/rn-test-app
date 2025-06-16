import React from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Image, Modal,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextInput, TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

export default function ComponentPlaygroundScreen() {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const toggleSwitch = () => setIsEnabled((prev) => !prev);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>React Native Components</Text>

            <Text style={styles.text}>This is a simple Text component.</Text>

            <Button title="Click Me" onPress={() => Alert.alert('Button pressed')}/>

            <TextInput
                placeholder="Type here"
                style={styles.input}
                placeholderTextColor="#999"
            />

            <Switch
                value={isEnabled}
                onValueChange={toggleSwitch}
            />

            <Image
                source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                style={styles.image}
            />

            <ActivityIndicator size="large" color="#00ff00"/>

            <Pressable
                style={styles.pressable}
                onPress={() => Alert.alert('Pressable pressed')}
            >
                <Text>Press Me</Text>
            </Pressable>

            <FlatList
                data={[{id: '1', title: 'Item 1'}, {id: '2', title: 'Item 2'}]}
                renderItem={({item}) => <Text>{item.title}</Text>}
                keyExtractor={item => item.id}
            />

            <TouchableOpacity onPress={() =>  setShowModal(true)}>
                <Text>Touch me</Text>
            </TouchableOpacity>

            <Modal visible={showModal} animationType="slide">
                <Text>I'm a modal!</Text>
                <TouchableOpacity onPress={() =>  setShowModal(false)}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:16,
    },
    text:{},
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 8,
        marginVertical: 8,
    },
    image: {
        width: 50,
        height: 50,
        marginVertical: 12,
    },
    pressable: {
        padding: 10,
        backgroundColor: '#ddd',
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 10,
    }
});