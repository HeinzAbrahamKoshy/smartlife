// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Import Feather for icons

// Define the ProfileScreen component
const ProfileScreen = () => {
    const navigation = useNavigation();
    const [date, setDate] = useState(getCurrentDate());
    const [time, setTime] = useState(getCurrentTime());
    const [showDrawer, setShowDrawer] = useState(false); // State to control drawer visibility
    const screenHeight = Dimensions.get('window').height;

    // Function to get current date
    function getCurrentDate() {
        const currentDate = new Date();
        const options = { month: 'long', day: 'numeric' };
        return currentDate.toLocaleString('en-US', options);
    }

    // Function to get current time
    function getCurrentTime() {
        const currentDate = new Date();
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return currentDate.toLocaleString('en-US', options);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(getCurrentDate());
            setTime(getCurrentTime());
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <View style={styles.container}>
            {/* Transparent gray box for title and current date/time */}
            <View style={styles.headerContainer}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Smartlife</Text>
                </View>
                {/* Current Date and Time */}
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
            </View>
            {/* Hamburger Menu */}
            <TouchableOpacity
                style={styles.menuIconContainer}
                onPress={() => setShowDrawer(true)}
            >
                <Feather name="menu" size={35} color="#000" />
            </TouchableOpacity>

            {/* Navigation Drawer */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showDrawer}
                onRequestClose={() => setShowDrawer(false)}
            >
                <View style={[styles.drawerContainer, { height: screenHeight }]}>
                    <TouchableOpacity style={styles.drawerItem} onPress={() => console.log('Profile pressed')}>
                        <Feather name="user" size={20} color="#fff" style={styles.drawerIcon} />
                        <Text style={styles.drawerText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerItem} onPress={() => console.log('Settings pressed')}>
                        <Feather name="settings" size={20} color="#fff" style={styles.drawerIcon} />
                        <Text style={styles.drawerText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerItem} onPress={() => console.log('See Productivity pressed')}>
                        <Feather name="bar-chart-2" size={20} color="#fff" style={styles.drawerIcon} />
                        <Text style={[styles.drawerText, { marginTop: 10 }]}>See Productivity</Text>
                    </TouchableOpacity>
                    <Button title="Close" onPress={() => setShowDrawer(false)} />
                </View>
            </Modal>

            <View style={styles.iconContainer}>
                {/* Tasks Icon */}
                <TouchableOpacity
                    style={[styles.iconBox, styles.iconBackground, styles.classyBlue]}
                    onPress={() => navigation.navigate('TasksList')}
                >
                    <Feather name="check-circle" size={80} color="#fff" />
                    <Text style={styles.iconLabel}>Tasks</Text>
                </TouchableOpacity>

                {/* Document Scanning Icon */}
                <TouchableOpacity
                    style={[styles.iconBox, styles.iconBackground, styles.classyViolet]}
                    onPress={() => navigation.navigate('DocScan')}
                >
                    <Feather name="file-text" size={80} color="#fff" />
                    <Text style={styles.iconLabel}>Doc Scan</Text>
                </TouchableOpacity>

                {/* Calendar Icon */}
                <TouchableOpacity
                    style={[styles.iconBox, styles.iconBackground, styles.classyBlue]}
                    onPress={() => navigation.navigate('Calander')}
                >
                    <Feather name="calendar" size={80} color="#fff" />
                    <Text style={styles.iconLabel}>Calendar</Text>
                </TouchableOpacity>

                {/* Stopwatch Icon */}
                <TouchableOpacity
                    style={[styles.iconBox, styles.iconBackground, styles.classyViolet]}
                    onPress={() => navigation.navigate('Timer')}
                >
                    <Feather name="watch" size={80} color="#fff" />
                    <Text style={styles.iconLabel}>Stopwatch</Text>
                </TouchableOpacity>

                {/* Notes Icon */}
                <TouchableOpacity
                    style={[styles.iconBox, styles.iconBackground, styles.classyBlue]}
                    onPress={() => navigation.navigate('NoteHome')}
                >
                    <Feather name="edit" size={80} color="#fff" />
                    <Text style={styles.iconLabel}>Notes</Text>
                </TouchableOpacity>

                {/* Alarm Icon */}
                <TouchableOpacity
                    style={[styles.iconBox, styles.iconBackground, styles.classyViolet]}
                    onPress={() => navigation.navigate('Alarmlist')}
                >
                    <Feather name="bell" size={80} color="#fff" />
                    <Text style={styles.iconLabel}>Alarm</Text>
                </TouchableOpacity>
            </View>

            {/* Microphone Icon */}
            <TouchableOpacity
                style={[styles.iconBox, styles.bottomIconBox, styles.circleButton]}
                onPress={() => console.log('Mic pressed')} // Handle microphone press action
            >
                <View style={[styles.iconBackground, styles.micButton]}>
                    <Feather name="mic" size={40} color="#fff" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF8E1', // Cream background color
        paddingTop: 40,
        paddingHorizontal: 19,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%', // Adjust width to 90%
        marginBottom: 22,
        marginRight:50,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // Transparent gray color
        borderRadius: 10,
        paddingVertical: 10,
    },

    creamBackground: {
        backgroundColor: '#FFF8E1', // Cream background color
    },

    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    dateTimeContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    dateText: {
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    timeText: {
        fontSize: 17,
    },
    menuIconContainer: {
        position: 'absolute',
        top: 58,
        right:29,
    },
    drawerContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60%',
        backgroundColor: 'rgba(0, 0, 0, 0.8999)', // Transparent black color
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10, // Rounded corners
        marginTop: 40, // Adjust the marginTop to create space between the header and the drawer items
        height: '100%', // Set height to full screen height
    },
    drawerItem: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5, // Adjust the marginTop to bring the text down
    },
    drawerIcon: {
        marginRight: 14,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%', // Take full width
        marginTop: 23,
    },
    iconBox: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconBackground: {
        borderRadius: 20,
        padding: 20,
    },
    iconLabel: {
        fontSize: 12,
        color: '#fff',
        marginTop: 10,
    },
    bottomIconBox: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
    },
    circleButton: {
        width: 100, // Set width and height to define the size of the circle
        height: 100,
    },
    micButton: {
        borderRadius: 50, // Make it a circle
        backgroundColor: '#008000', // Green color
    },
    classyBlue: {
        backgroundColor: 'rgba(52, 102, 183, 0.6)', // Classy blue color
    },
    classyViolet: {
        backgroundColor: 'rgba(148, 0, 211, 0.41)', // Classy violet color
    },
});

export default ProfileScreen;
