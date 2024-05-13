import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TasksListScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (task) => {
    navigation.navigate("EditTask", { taskId: task.id, taskDetails: task });
  };

  const deleteTask = async (taskId) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <TouchableOpacity
        style={[
          styles.taskItem,
          { backgroundColor: index % 2 === 0 ? 'rgba(65, 105, 225, 0.5)' : 'rgba(138, 43, 226, 0.5)' }
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
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.taskList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddTask", { addTask })}>
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
    borderRadius: 10,
    marginVertical: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TasksListScreen;
