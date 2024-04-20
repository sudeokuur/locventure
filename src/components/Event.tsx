import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface EventProps {
  event: {
    id: string;
    eventName: string;
    eventDate: string;
    eventCity: string;
    eventDescription: string;
    eventImage: string; // Assuming eventImage is a URL to the image
    eventType: string;
  };
}

const Event: React.FC<EventProps> = ({ event }) => {
  const navigation = useNavigation();

  const handleEventPress = () => {
    navigation.navigate('EventDetail', { event: event });
  };

  return (
    <TouchableOpacity onPress={handleEventPress}>
      <ImageBackground
        source={{ uri: event.eventImage }}
        style={styles.background}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{event.eventName}</Text>
          <Text style={styles.details}>Date: {event.eventDate}</Text>
          <Text style={styles.details}>Location: {event.eventCity}</Text>
          <Text style={styles.details}>Category: {event.eventType}</Text>
          <Text style={styles.details}>Description: {event.eventDescription}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  background: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#262323',
    backgroundColor: 'transparent', // Set background color to transparent
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white', // Assuming white text for visibility
  },
  details: {
    fontSize: 16,
    color: 'white', // Assuming white text for visibility
  },
});

export default Event;
