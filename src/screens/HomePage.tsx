import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    navigation.navigate('EventDetail', { event: event });
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
        <ImageBackground
          source={{ uri: item.eventImage }}
          style={styles.background}
          imageStyle={{ borderRadius: 8 }}
        >
          <View style={styles.container}>
            <Text style={[styles.eventName, { color: 'white' }]}>{item.eventName}</Text>
            <Text style={{ color: 'white' }}>Date: {item.eventDate.toDate().toLocaleDateString()} - {eventTimeString}</Text>
            <Text style={{ color: 'white' }}>Location: {item.eventLocation}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    navigation.navigate('Login');
    console.log('Logged out!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
  eventItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  background: {
    padding: 36,
    backgroundColor: 'transparent'
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
});

export default HomePage;
