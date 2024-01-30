import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface EventProps {
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
    description?: string;
  };
}

const Event: React.FC<EventProps> = ({ event }) => {
  const navigation = useNavigation();

/*  const handleEventPress = () => {
    navigation.navigate('EventDetail', { event: event });  // Ensure you pass the event object correctly
  }; */

  return (
  /*  <TouchableOpacity onPress={handleEventPress}> */
      <View style={styles.container}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.details}>Date: {event.date}</Text>
        <Text style={styles.details}>Location: {event.location}</Text>
      </View>
 /*   </TouchableOpacity> */
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
  },
});

export default Event;
