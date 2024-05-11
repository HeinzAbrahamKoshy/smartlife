import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler'; // Import Swipeable from react-native-gesture-handler
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TasksListScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([
    { id: '1', name: 'Task 1', priority: 'High', dueDate: '2024-04-20', dueTime: '10:00 AM', reminder: true },
    { id: '2', name: 'Task 2', priority: 'Medium', dueDate: '2024-04-22', dueTime: '3:00 PM', reminder: false },
    // Add more tasks as needed
  ]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditTask = (task) => {
    navigation.navigate("EditTask", { task });
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <TouchableOpacity
        style={[
          styles.taskItem,
          { backgroundColor: 'rgba(65, 105, 225, 0.5)' }
        ]}
        onPress={() => handleEditTask(item)}
      >
        <Text style={styles.taskName}>{item.name}</Text>
        <Text style={styles.taskDetail}>Priority: {item.priority}</Text>
        <Text style={styles.taskDetail}>Due: {item.dueDate} at {item.dueTime}</Text>
        {item.reminder && <Text style={styles.taskDetail}>Reminder: On</Text>}
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tasks List</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.taskList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddTask")}>
        <Text style={styles.addButtonIcon}>+</Text>
        <Text style={styles.addButtonText}>Add Tasks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  taskList: {
    paddingHorizontal: 10,
  },
  taskItem: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
  },
  taskName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  taskDetail: {
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(30, 144, 255, 0.5)', // Blue color with transparency
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonIcon: {
    fontSize: 24,
    color: '#fff',
    marginRight: 10,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TasksListScreen;
