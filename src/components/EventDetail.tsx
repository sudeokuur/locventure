import firestore from '@react-native-firebase/firestore'; // Import Firebase Firestore
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from react-navigation/native
import React, { useEffect, useState } from 'react'; // Importing React, useEffect, and useState from React library
import { Button, StyleSheet, Text, View } from 'react-native'; // Importing necessary components from react-native

interface EventDetailProps {
  route: {
    params?: {
      eventId: string; // eventId passed from navigation
    };
  };
}

// Functional component definition for EventDetail
const EventDetail: React.FC<EventDetailProps> = ({ route }) => {
  const { eventId } = route.params || {}; // Extracting eventId from route parameters
  const [event, setEvent] = useState<any>(null); // State to store event details
  const navigation = useNavigation(); // Initializing navigation hook

  // useEffect hook to fetch event details when component mounts
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

  // Function to handle navigation back
  const handleGoBack = () => {
    navigation.goBack(); // Navigate back when "Go Back" button is pressed
  };

  // If event details are not loaded yet, display loading message
  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Loading event details...</Text>
      </View>
    );
  }

  // If event details are loaded, display event details and "Go Back" button
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.eventName}</Text>
      <Text style={styles.details}>Date: {event.eventDate}</Text>
      <Text style={styles.details}>Event Location: {event.eventCity}</Text>
      <Text style={styles.details}>Category: {event.eventType}</Text>

      {event.eventDescription && (
        <Text style={styles.details}>Description: {event.eventDescription}</Text>
      )}
      <Button title="Go Back" onPress={handleGoBack} /> {/* "Go Back" button */}
    </View>
  );
};

// Styles for EventDetail component
const styles = StyleSheet.create({
  container: {
    padding: 16, // Padding for event details container
  },
  title: {
    fontSize: 24, // Font size for event title
    fontWeight: 'bold', // Bold font weight for event title
    marginBottom: 8, // Margin bottom for spacing
  },
  details: {
    fontSize: 18, // Font size for event details
    marginBottom: 8, // Margin bottom for spacing
  },
  errorText: {
    fontSize: 18, // Font size for error message
    color: 'red', // Text color for error message
  },
});

export default EventDetail; // Exporting EventDetail component as default
