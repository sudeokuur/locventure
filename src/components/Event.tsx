import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface EventProps {
  event: {
    id: string;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    eventDescription?: string;
  };
}

const Event: React.FC<EventProps> = ({ event }) => {
  const navigation = useNavigation();

  const handleEventPress = () => {
    navigation.navigate('EventDetail', { event: event });
  };

  return (
    <TouchableOpacity onPress={handleEventPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{event.eventName}</Text>
        <Text style={styles.details}>Date: {event.eventDate}</Text>
        <Text style={styles.details}>Location: {event.eventLocation}</Text>
        {/* Uncomment the following line if you have event description */}
        {/* <Text style={styles.details}>Description: {event.eventDescription}</Text> */}
      </View>
    </TouchableOpacity>
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
