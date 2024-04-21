import auth from '@react-native-firebase/auth'; // Importing auth module from @react-native-firebase/auth
import { firebase } from '@react-native-firebase/firestore'; // Importing firebase module from @react-native-firebase/firestore
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook from @react-navigation/native
import React, { useEffect, useState } from 'react'; // Importing React, useEffect, and useState from React library
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'; // Importing necessary components from react-native
import Event from '../components/Event'; // Importing the Event component from the components folder

// Functional component definition for HomePage
const HomePage: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]); // State to store upcoming events
  const [pastEvents, setPastEvents] = useState<any[]>([]); // State to store past events
  const [userFirstName, setUserFirstName] = useState<string>(''); // State to store user's first name
  const [userLocation, setUserLocation] = useState<string>(''); // State to store user's location
  const navigation = useNavigation(); // Initializing navigation hook

  // Effect to fetch user information and events
  useEffect(() => {
    // Function to fetch user information
    const fetchUserInfo = async () => {
      try {
        const currentUser = auth().currentUser; // Getting current user
        if (currentUser) {
          const userId = currentUser.uid; // Getting user ID
          const userDoc = await firebase.firestore().collection('users').doc(userId).get(); // Getting user document from Firestore
          const userData = userDoc.data(); // Extracting user data
          if (userData) {
            setUserFirstName(userData.firstName); // Setting user's first name in state
            setUserLocation(userData.location); // Setting user's location in state
          }
        }
      } catch (error) {
        console.error('Error fetching user information:', error); // Logging error if any
      }
    };

    // Function to fetch events from Firestore
    const fetchEvents = async () => {
      try {
        const db = firebase.firestore(); // Initializing Firestore
        const snapshot = await db.collection('events').get(); // Getting events collection
        const currentDate = new Date(); // Getting current date
    
        const locationBasedEventsData = []; // Array to store events for the user's location
        const pastEventsData = []; // Array to store past events
    
        snapshot.forEach((doc) => {
          const eventData = { id: doc.id, ...doc.data() }; // Extracting event data
          const eventDate = new Date(eventData.eventDate._seconds * 1000); // Converting event date from Firestore timestamp
    
          if (eventDate < currentDate) {
            pastEventsData.push({ ...eventData, eventDate: eventDate.toLocaleString() }); // Adding past events to the array
          }
    
          locationBasedEventsData.push({ ...eventData, eventDate: eventDate.toLocaleString() }); // Adding events for the user's location to the array
        });
    
        setUpcomingEvents(locationBasedEventsData); // Setting upcoming events in state
        setPastEvents(pastEventsData); // Setting past events in state
      } catch (error) {
        console.error('Error fetching events from Firestore:', error); // Logging error if any
      }
    };

    fetchUserInfo(); // Calling fetchUserInfo function
    fetchEvents(); // Calling fetchEvents function
  }, [userLocation]); // Effect runs when user location changes

  // Function to handle logout
  const handleLogout = () => {
    navigation.navigate('Login'); // Navigating to the Login screen
    console.log('Logged out!'); // Logging logout message
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Welcome, {userFirstName}!</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Events for your location: {userLocation}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <FlatList
            data={upcomingEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Event event={item} />} // Rendering Event component for each upcoming event
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Events</Text>
          <FlatList
            data={pastEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Event event={item} />} // Rendering Event component for each past event
            horizontal={true} // Displaying past events horizontally
          />
        </View>
        <Button title="Logout" onPress={handleLogout} /> {/* Logout button */}
      </View>
    </ScrollView>
  );
};

// Styles for HomePage component
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  eventsForLocation: {
    backgroundColor: 'gray',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  eventsForLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomePage; // Exporting HomePage component as default
