import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;

  const [taskName, setTaskName] = useState(task.name || 'Task Name');
  const [priority, setPriority] = useState(task.priority || 'High');
  const [dueDate, setDueDate] = useState(new Date(task.dueDate) || new Date());
  const [dueTime, setDueTime] = useState(new Date(task.dueTime) || new Date());
  const [reminder, setReminder] = useState(task.reminder || true);

  const handleSaveChanges = () => {
    const updatedTask = {
      ...task,
      name: taskName,
      priority: priority,
      dueDate: dueDate.toISOString().split('T')[0],
      dueTime: dueTime.toLocaleTimeString(),
      reminder: reminder,
    };
    console.log('Updated Task:', updatedTask);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Task</Text>
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
      />
      <TextInput
        style={styles.input}
        value={priority}
        onChangeText={setPriority}
      />
      <DateTimePicker
        value={dueDate}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => setDueDate(selectedDate || dueDate)}
      />
      <DateTimePicker
        value={dueTime}
        mode="time"
        display="default"
        onChange={(event, selectedTime) => setDueTime(selectedTime || dueTime)}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
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
});

export default EditTaskScreen;
