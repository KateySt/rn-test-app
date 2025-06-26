import React, { useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioNotesScreen = () => {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [recordedPath, setRecordedPath] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  const onStartRecord = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Cannot record audio without permission');
          return;
        }
      }

      const path = Platform.select({
        ios: `${RNFS.DocumentDirectoryPath}/audio_note.m4a`,
        android: `${RNFS.ExternalCachesDirectoryPath}/audio_note.m4a`,
      }) || 'audio_note.m4a';

      await audioRecorderPlayer.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener(e => {
        setDuration(e.currentPosition);
        return;
      });
      setRecording(true);
      setRecordedPath(path);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const onStopRecord = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecording(false);
      setDuration(0);
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const onStartPlay = async () => {
    if (!recordedPath) {
      Alert.alert('No recording', 'Please record something first');
      return;
    }
    try {
      await audioRecorderPlayer.startPlayer(recordedPath);
      audioRecorderPlayer.addPlayBackListener(e => {
        if (e.currentPosition >= e.duration) {
          onStopPlay();
        }
        return;
      });
      setPlaying(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start playback');
    }
  };

  const onStopPlay = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setPlaying(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to stop playback');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio Notes {duration}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={recording ? onStopRecord : onStartRecord}
      >
        <Text style={styles.buttonText}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>

      {recordedPath && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4caf50' }]}
          onPress={playing ? onStopPlay : onStartPlay}
        >
          <Text style={styles.buttonText}>
            {playing ? 'Stop Playback' : 'Play Recording'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AudioNotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});
