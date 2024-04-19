// ProfileScreen.js
import React from 'react';
import { View, Text,Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Home Screen</Text>
      {/* Add  information here */}
      <View>
      <Button title="Go to Tasks List" onPress={() => navigation.navigate('TasksList')} />
      <Button title="Go to Doc scan" onPress={() => navigation.navigate('DocScan')} />
    </View>
    </View>
    
  );
}

export default ProfileScreen;
