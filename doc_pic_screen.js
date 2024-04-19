import React, { useState, useEffect } from 'react';
import { View, Button, Text, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { ImageManipulator } from 'expo-image-manipulator';
import { PerspectiveImageCropper } from 'react-native-perspective-image-cropper';
import * as FileSystem from 'expo-file-system'; // Import FileSystem from Expo
import { useNavigation } from '@react-navigation/native';

const DocumentScannerScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setImageUri(photo.uri);
      setModalVisible(true); // Show the image in a modal
    }
  };

  const applyFilter = async (filterType) => {
    if (imageUri) {
      const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ [filterType]: true }],
        { compress: 1, format: 'png' }
      );
      setFilteredImage(manipResult.uri);
    }
  };

  const handleCrop = async () => {
    if (filteredImage || imageUri) {
      const uriToCrop = filteredImage || imageUri;
      const manipResult = await ImageManipulator.manipulateAsync(
        uriToCrop,
        [{ crop: { originX: 0, originY: 0, width: 500, height: 500 } }],
        { compress: 1, format: 'png' }
      );
      setCroppedImage(manipResult.uri);
      
      // Save the cropped image to local storage
      const dir = FileSystem.documentDirectory + 'croppedImages/';
      const filename = 'cropped_image.png';
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
      await FileSystem.moveAsync({ from: manipResult.uri, to: dir + filename });
      setImageUri(manipResult.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {hasPermission === null ? (
        <View />
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            ref={(ref) => setCameraRef(ref)}
          />
          <Button title="Take Picture" onPress={takePicture} />
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: imageUri }} style={{ width: '80%', height: '80%' }} />
              <Button title="Close" onPress={() => setModalVisible(false)} />
              <Button title="Apply Grayscale" onPress={() => applyFilter('grayscale')} />
              <Button title="Apply Sepia" onPress={() => applyFilter('sepia')} />
              <Button title="Crop Image" onPress={handleCrop} />
            </View>
          </Modal>
          {filteredImage && (
            <Image source={{ uri: filteredImage }} style={{ width: '80%', height: '80%' }} />
          )}
          {croppedImage && (
            <PerspectiveImageCropper imageUri={croppedImage} />
          )}
        </View>
      )}
    </View>
  );
};

export default DocumentScannerScreen;
