import React, { useState, useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (permission?.granted) {
      // Permission is granted, do any initial setup here.
    }
  }, [permission]);

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

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (!cameraRef) return; // Ensure the camera reference is available
    const photo = await cameraRef.takePictureAsync();
    const manipulatedImage = await manipulateAsync(
      photo.uri,
      [{ rotate: 90 }, { flip: FlipType.Vertical }],
      { compress: 1, format: SaveFormat.PNG }
    );
    setCapturedImage(manipulatedImage);
  }

  const rotateLeft = async () => {
    if (!capturedImage) return;
    const rotatedImage = await manipulateAsync(
      capturedImage.uri,
      [{ rotate: -90 }],
      { compress: 1, format: SaveFormat.PNG }
    );
    setCapturedImage(rotatedImage);
  };

  const rotateRight = async () => {
    if (!capturedImage) return;
    const rotatedImage = await manipulateAsync(
      capturedImage.uri,
      [{ rotate: 90 }],
      { compress: 1, format: SaveFormat.PNG }
    );
    setCapturedImage(rotatedImage);
  };

  const cropImage = async () => {
    if (!capturedImage) return;
    const croppedImage = await manipulateAsync(
      capturedImage.uri,
      [{ crop: { originX: 0, originY: 0, width: 500, height: 400 } }],
      { compress: 1, format: SaveFormat.PNG }
    );
    setCapturedImage(croppedImage);
  };

  let cameraRef;

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={ref => (cameraRef = ref)} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={rotateLeft}>
            <Text style={styles.text}>Rotate Left</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={rotateRight}>
            <Text style={styles.text}>Rotate Right</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={cropImage}>
            <Text style={styles.text}>Crop Image</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {capturedImage && (
        <View style={styles.imagePreviewContainer}>
          <Text style={styles.text}>Manipulated Image Preview:</Text>
          <Image source={{ uri: capturedImage.uri }} style={styles.imagePreview} />
        </View>
      )}
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
    justifyContent: 'space-around', // Changed to space-around for better alignment
    padding: 20,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
