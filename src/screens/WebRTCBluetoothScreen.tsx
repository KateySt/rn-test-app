import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PermissionsAndroid,
    Platform,
    FlatList,
    TouchableOpacity,
    Modal,
    Pressable,
    Linking, Alert,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const bleManager = new BleManager();

const WebRTCBluetoothScreen = () => {
    const [devices, setDevices] = useState<any[]>([]);
    const [isBluetoothOff, setIsBluetoothOff] = useState(false);

    useEffect(() => {
        const subscription = bleManager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                scanBluetoothDevices();
                setIsBluetoothOff(false);
            } else if (state === 'PoweredOff') {
                setIsBluetoothOff(true);
            }
        }, true);

        return () => {
            bleManager.destroy();
            subscription.remove();
        };
    }, []);

    const scanBluetoothDevices = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            ]);
        }

        setDevices([]);

        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.warn('Scan error:', error);
                return;
            }

            if (device?.name) {
                setDevices((prev) => {
                    const exists = prev.find((d) => d.id === device.id);
                    if (!exists) {
                        console.log('New device:', device.name);
                        return [...prev, device];
                    }
                    return prev;
                });
            }
        });

        setTimeout(() => {
            bleManager.stopDeviceScan();
        }, 10000);
    };

    const openBluetoothSettings = () => {
        if (Platform.OS === 'android') {
            Linking.openSettings();
        } else {
            Alert.alert('Please enable Bluetooth in Settings manually.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>WebRTC + Bluetooth Devices</Text>

            <Text style={styles.subtitle}>Nearby Bluetooth Devices:</Text>
            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.deviceItem}>
                        <Text style={styles.deviceName}>{item.name || 'Unnamed device'}</Text>
                        <Text style={styles.deviceId}>{item.id}</Text>
                    </TouchableOpacity>
                )}
            />

            <Modal visible={isBluetoothOff} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Bluetooth is Off</Text>
                        <Text style={styles.modalText}>
                            Please enable Bluetooth to scan for nearby devices.
                        </Text>
                        <Pressable onPress={openBluetoothSettings} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Open Settings</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default WebRTCBluetoothScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10,
    },
    subtitle: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
    },
    deviceItem: {
        padding: 10,
        borderBottomColor: '#555',
        borderBottomWidth: 1,
    },
    deviceName: {
        color: '#fff',
        fontSize: 16,
    },
    deviceId: {
        color: '#999',
        fontSize: 12,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
function alert(arg0: string) {
    throw new Error('Function not implemented.');
}

