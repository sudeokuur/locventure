import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button, TextInput, TouchableOpacity, Text } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const PastEventsScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [events, setEvents] = useState<any[]>([]);
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
            return eventDate < currentDate; // Only include events with dates on or after the current date
          });

        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events from Firestore:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.eventName && event.eventName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEventPress = (event) => {
    navigation.navigate('EventDetailScreen', { event });
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search for Event"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  eventItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default PastEventsScreen;
