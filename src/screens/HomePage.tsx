import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Event from '../components/Event';

const HomePage: React.FC = () => {
  const [locationEvents, setLocationEvents] = useState<any[]>([]);
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
    
        const locationEventsData = [];
        const pastEventsData = [];
        const upcomingEventsData = [];
    
        snapshot.forEach((doc) => {
          const eventData = { id: doc.id, ...doc.data() };
          const eventDate = new Date(eventData.eventDate._seconds * 1000);
          if (eventData.eventCity === userLocation) {
            locationEventsData.push({ ...eventData, eventDate: eventDate.toLocaleString() });
          }
          
          if (eventDate < currentDate) {
            pastEventsData.push({ ...eventData, eventDate: eventDate.toLocaleString() });
          } else if (eventDate > currentDate && eventData.eventCity !== userLocation) {
            upcomingEventsData.push({ ...eventData, eventDate: eventDate.toLocaleString() });
          }
        });
    
        setLocationEvents(locationEventsData);
        setUpcomingEvents(upcomingEventsData);
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
          {locationEvents.length > 0 ? (
            locationEvents.map((event) => (
              <Event key={event.id} event={event} />
            ))
          ) : (
            <Text style={styles.noEventsMessage}>No events available for your location.</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Events</Text>
          {pastEvents.map((event) => (
            <Event key={event.id} event={event} />
          ))}
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
  noEventsMessage: {
    fontSize: 16,
    color: 'white',
  },
});

export default HomePage;
