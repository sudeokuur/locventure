// EventsScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import Event from '../components/Event';
import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const EventsScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [events, setEvents] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const db = firebase.firestore();
        const snapshot = await db.collection('events').get();
        const eventsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    navigation.navigate('EventDetail', { event });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item)}>
      <Event event={item} />
    </TouchableOpacity>
  );

  const handleLogout = () => {
    navigation.navigate('Login');
    console.log('Çıkış yapıldı');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Etkinlik Ara"
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
});

export default EventsScreen;
