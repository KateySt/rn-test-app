import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { Button } from 'react-native-paper';

const NfcScreen = () => {
    const [nfcSupported, setNfcSupported] = useState<boolean | null>(null);
    const [nfcEnabled, setNfcEnabled] = useState<boolean | null>(null);
    const [tag, setTag] = useState<any>(null);

    useEffect(() => {
        const initNfc = async () => {
            try {
                await NfcManager.start();
                const supported = await NfcManager.isSupported();
                const enabled = await NfcManager.isEnabled();

                setNfcSupported(supported);
                setNfcEnabled(enabled);
            } catch (e) {
                setNfcSupported(false);
                setNfcEnabled(false);
            }
        };

        void initNfc();

        return () => {
            NfcManager.cancelTechnologyRequest();
        };
    }, []);

    const readTag = async () => {
        try {
            await NfcManager.requestTechnology([NfcTech.Ndef, NfcTech.NfcA]);
            const tagData = await NfcManager.getTag();
            setTag(tagData);
            Alert.alert('NFC Tag Detected', JSON.stringify(tagData));
        } catch (err) {
            Alert.alert('Error', 'Failed to read NFC tag.');
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    };

    if (nfcSupported === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>NFC is not supported on this device.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>NFC Reader</Text>
            <Text style={styles.text}>NFC Supported: {nfcSupported ? 'Yes' : 'No'}</Text>
            <Text style={styles.text}>NFC Enabled: {nfcEnabled ? 'Yes' : 'No'}</Text>

            <Button mode="contained" onPress={readTag} style={{ marginTop: 20 }}>
                Scan NFC Tag
            </Button>

            {tag && (
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.text}>Tag ID: {tag?.id}</Text>
                </View>
            )}
        </View>
    );
};

export default NfcScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    text: {
        color: '#ccc',
        fontSize: 16,
    },
});
