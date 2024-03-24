import firestore from '@react-native-firebase/firestore'; // Import Firebase Firestore
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface EventDetailProps {
  route: {
    params?: {
      eventId: string; // eventId passed from navigation
    };
  };
}

const EventDetail: React.FC<EventDetailProps> = ({ route }) => {
  const { eventId } = route.params || {};
  const [event, setEvent] = useState<any>(null); // State to store event details
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventRef = firestore().collection('events').doc(eventId); // Reference to the event document
        const documentSnapshot = await eventRef.get(); // Fetch event document
        if (documentSnapshot.exists) {
          // If event document exists, set event state
          setEvent(documentSnapshot.data());
        } else {
          console.log('Event does not exist');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails(); // Call fetchEventDetails function

    // Cleanup function if needed
    return () => {
      // Cleanup code here
    };
  }, [eventId]); // Effect runs whenever eventId changes

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back when "Go Back" button is pressed
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Loading event details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.eventName}</Text>
      <Text style={styles.details}>Date: {event.eventDate}</Text>
      <Text style={styles.details}>Location: {event.eventLocation}</Text>
      <Text style={styles.details}>Category: {event.eventType}</Text>

      {event.eventDescription && (
        <Text style={styles.details}>Description: {event.eventDescription}</Text>
      )}
      <Button title="Go Back" onPress={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 18,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default EventDetail;
