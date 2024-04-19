import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TasksListScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([
    { id: '1', name: 'Task 1', priority: 'High', dueDate: '2024-04-20', dueTime: '10:00 AM', reminder: true },
    { id: '2', name: 'Task 2', priority: 'Medium', dueDate: '2024-04-22', dueTime: '3:00 PM', reminder: false },
    // Add more tasks as needed
  ]);

  const handleEditTask = (task) => {
    navigation.navigate("EditTask", { task });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => handleEditTask(item)}>
      <Text>{item.name}</Text>
      <Text>Priority: {item.priority}</Text>
      <Text>Due: {item.dueDate} at {item.dueTime}</Text>
      {item.reminder && <Text>Reminder: On</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tasks List</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View>
        <Button title="Add Tasks" onPress={() => navigation.navigate("AddTask")} />
      </View>
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
  taskItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default TasksListScreen;
