import { StatusBar } from 'expo-status-bar';
// App.js (main entry point)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import TasksListScreen from './TasksListScreen';
import AddTaskScreen from './AddTaskScreen';
import EditTaskScreen from './EditTaskScreen';
import doc_pic_screen from './doc_pic_screen';
import getstarted from './getstarted';
import splash from './splash';
import CalanderScreen from './calendar';
import { StyleSheet } from 'react-native';
import Timer from './Timer';
import AlarmList from './AlarmList';
import Alarm from './Alarm';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="TasksList" component={TasksListScreen} />
        <Stack.Screen name="DocScan" component={doc_pic_screen} />
        <Stack.Screen name="Calander" component={CalanderScreen} />
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="Alarmlist" component={AlarmList} />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="NoteHome" component={HomeScreen} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
        <Stack.Screen name="getstarted" component={getstarted} />
        <Stack.Screen name="splash" component={splash} />
      </Stack.Navigator>
     
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
