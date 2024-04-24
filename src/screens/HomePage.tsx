import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Event from '../components/Event';

const HomePage: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userLocation, setUserLocation] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userDoc = await firebase.firestore().collection('users').doc(userId).get();
          const userData = userDoc.data();
          if (userData) {
            setUserFirstName(userData.firstName);
            setUserLocation(userData.location);
          }
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const db = firebase.firestore();
        const snapshot = await db.collection('events').get();
        const currentDate = new Date();
    
        const locationBasedEventsData = [];
        const pastEventsData = [];
    
        snapshot.forEach((doc) => {
          const eventData = { id: doc.id, ...doc.data() };
          const eventDate = new Date(eventData.eventDate._seconds * 1000);
    
          if (eventDate < currentDate) {
            pastEventsData.push({ ...eventData, eventDate: eventDate.toLocaleString() });
          }
    
          locationBasedEventsData.push({ ...eventData, eventDate: eventDate.toLocaleString() });
        });
    
        setUpcomingEvents(locationBasedEventsData);
        setPastEvents(pastEventsData);
      } catch (error) {
        console.error('Error fetching events from Firestore:', error);
      }
    };
    

    fetchUserInfo();
    fetchEvents();
  }, [userLocation]);

  const handleLogout = () => {
    navigation.navigate('Login');
    console.log('Logged out!');
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
            renderItem={({ item }) => <Event event={item} />}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Events</Text>
          <FlatList
            data={pastEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Event event={item} />}
            horizontal={true}
          />
        </View>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

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

export default HomePage;
