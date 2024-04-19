import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [reminder, setReminder] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddTask = async () => {
    // Prepare task object
    const task = {
      taskName,
      priority,
      dueDate: dueDate.toISOString().split('T')[0], // Format dueDate as YYYY-MM-DD
      dueTime: dueTime.toLocaleTimeString(), // Format dueTime as HH:MM:SS
      reminder,
    };

    try {
      // Get existing tasks from AsyncStorage
      const existingTasks = await AsyncStorage.getItem('tasks');
      let updatedTasks = [];

      if (existingTasks !== null) {
        updatedTasks = JSON.parse(existingTasks);
      }

      // Add new task to the list
      updatedTasks.push(task);

      // Save updated tasks to AsyncStorage
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      // Reset form fields
      setTaskName('');
      setPriority('');
      setDueDate(new Date());
      setDueTime(new Date());
      setReminder(false);

      console.log('Task added:', task);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const handleTimePickerChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDueTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />
      <TextInput
        style={styles.input}
        placeholder="Priority"
        value={priority}
        onChangeText={setPriority}
      />
      {/* Due Date picker */}
      <View style={styles.datePickerContainer}>
        <Button title="Select Due Date" onPress={showDatePickerModal} />
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={handleDatePickerChange}
          />
        )}
      </View>
      {/* Due Time picker */}
      <View style={styles.datePickerContainer}>
        <Button title="Select Due Time" onPress={showTimePickerModal} />
        {showTimePicker && (
          <DateTimePicker
            value={dueTime}
            mode="time"
            display="default"
            onChange={handleTimePickerChange}
          />
        )}
      </View>
      <View style={styles.checkboxContainer}>
        <Text>Reminder</Text>
        <Switch value={reminder} onValueChange={setReminder} />
      </View>
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default AddTaskScreen;
