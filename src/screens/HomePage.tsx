import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomePage: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const db = firebase.firestore();
        const snapshot = await db.collection('events').get();
        const currentDate = new Date();

        const eventsData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((event) => {
            const eventDate = event.eventDate.toDate();
            return eventDate >= currentDate; // Separate upcoming and past events
          });

        const pastEventsData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((event) => {
            const eventDate = event.eventDate.toDate();
            return eventDate < currentDate; // Separate upcoming and past events
          });

        setUpcomingEvents(eventsData);
        setPastEvents(pastEventsData);
      } catch (error) {
        console.error('Error fetching events from Firestore:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventPress = (event) => {
    navigation.navigate('EventDetail', { event });
  };

  const renderItem = ({ item }) => {
    let eventTimeString = '';
    if (item.eventTime instanceof firebase.firestore.Timestamp) {
      eventTimeString = item.eventTime.toDate().toLocaleTimeString();
    } else {
      eventTimeString = item.eventTime; // Assuming eventTime is already a string
    }

    return (
      <TouchableOpacity onPress={() => handleEventPress(item)} style={styles.eventItem}>
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text>{item.eventDate.toDate().toLocaleDateString()} - {eventTimeString}</Text>
        <Text>{item.eventLocation}</Text>
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    navigation.navigate('Login');
    console.log('Logged out!');
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <FlatList
          data={upcomingEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Events</Text>
        <FlatList
          data={pastEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true} // Set FlatList to horizontal mode
        />
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black', // Set background color to black
  },
  searchInput: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white', // Set input background color to white
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white', // Set section title color to white
  },
  eventItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white', // Set event item background color to white
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default HomePage;
