import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notifications } from 'react-native-notifications';

const AlarmList = ({ navigation }) => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    // Load alarms from AsyncStorage when component mounts
    loadAlarms();
  }, []);

  const loadAlarms = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const alarmKeys = keys.filter(key => key.startsWith('alarm_'));
      const alarmItems = await AsyncStorage.multiGet(alarmKeys);
      const alarmsData = alarmItems.map(item => JSON.parse(item[1]));
      setAlarms(alarmsData);
    } catch (error) {
      console.error('Error loading alarms:', error);
    }
  };

  const renderAlarmItem = ({ item }) => (
    <TouchableOpacity style={styles.alarmItem} onPress={() => handleEditAlarm(item.id)}>
      <Text>{item.time}</Text>
      <Text>{item.repeatDays.join(', ')}</Text>
      <TouchableOpacity onPress={() => handleDeleteAlarm(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleEditAlarm = (alarmId) => {
    // Navigation logic to navigate to Edit Alarm screen with alarmId
    navigation.navigate('EditAlarm', { alarmId });
  };

  const handleDeleteAlarm = async (alarmId) => {
    try {
      // Remove alarm from AsyncStorage
      await AsyncStorage.removeItem(`alarm_${alarmId}`);
      // Cancel any scheduled notifications for the alarm
      Notifications.cancelLocalNotifications({ id: alarmId.toString() });
      // Reload alarms
      loadAlarms();
    } catch (error) {
      console.error('Error deleting alarm:', error);
    }
  };
  
  const handleNavigateToCreateAlarm = () => {
    // Navigation logic to navigate to Create Alarm screen
    navigation.navigate('Alarm');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        renderItem={renderAlarmItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No alarms found</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleNavigateToCreateAlarm}>
        <Text style={styles.addButtonText}>Add Alarm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    color: 'red',
  },
});

export default AlarmList;
