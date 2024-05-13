import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Modal, Image, Alert } from 'react-native';
import { ImageManipulator } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { launchCamera, launchImageLibrary } from 'react-native-image-tools-wm';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    try {
      const options = {
        quality: 1, // Adjust quality as needed
        base64: false, // Set to true for base64 data
      };

      const result = await launchCamera(options);
      if (!result.didCancel) {
        setImageUri(result.uri);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

  const applyFilter = async (filterType) => {
    if (imageUri) {
      try {
        const manipResult = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ [filterType]: true }],
          { compress: 1, format: 'png' }
        );
        setImageUri(manipResult.uri);
      } catch (error) {
        console.error('Error applying filter:', error);
        Alert.alert('Error', 'Failed to apply filter. Please try again.');
      }
    }
  };

  const handleSave = async () => {
    if (imageUri) {
      // Save the image to local storage
      const dir = FileSystem.documentDirectory + 'capturedImages/';
      const filename = 'captured_image.png';
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
      await FileSystem.moveAsync({ from: imageUri, to: dir + filename });

      // Display success message
      Alert.alert('Success', 'Image saved successfully.');
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={() => setModalVisible(false)} />
            <Button title="Apply Grayscale" onPress={() => applyFilter('grayscale')} />
            <Button title="Apply Sepia" onPress={() => applyFilter('sepia')} />
            <Button title="Save Image" onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    marginBottom: 20,
  },
});
