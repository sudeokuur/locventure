import firebase from '@react-native-firebase/app'; // Importing firebase from @react-native-firebase/app
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook from @react-navigation/native
import React, { useEffect, useState } from 'react'; // Importing React, useEffect, and useState from React library
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Importing necessary components from react-native

// Function to update event response in Firestore
const updateEventResponse = async (userId, eventId, response) => {
  try {
    const eventRef = firebase.firestore().collection('events').doc(eventId); // Reference to the event document in Firestore
    await eventRef.update({
      [`responses.${userId}`]: response // Updating response for the user in the event document
    });
    console.log('Event response updated successfully');
  } catch (error) {
    console.error('Error updating event response:', error); // Logging error if any
  }
};

// Function to get user's event response from Firestore
const getUserEventResponse = async (userId, eventId) => {
  try {
    const eventRef = firebase.firestore().collection('events').doc(eventId); // Reference to the event document in Firestore
    const eventDoc = await eventRef.get(); // Getting the event document
    if (eventDoc.exists) { // Checking if the event document exists
      const eventData = eventDoc.data(); // Getting data from the event document
      if (eventData.responses && eventData.responses[userId]) { // Checking if the user has responded to the event
        return eventData.responses[userId]; // Returning user's response
      }
    }
    return null; // Returning null if user's response not found
  } catch (error) {
    console.error('Error getting user event response:', error); // Logging error if any
    return null;
  }
};

// Functional component definition for EventDetailScreen
const EventDetailScreen = ({ route }) => {
  const { event } = route.params; // Extracting event object from route params
  const navigation = useNavigation(); // Initializing navigation hook

  const [response, setResponse] = useState(null); // State to manage user's response to the event
  const [userResponse, setUserResponse] = useState(null); // State to store user's response fetched from Firestore

  // Effect to check if the current user has already responded to the event
  useEffect(() => {
    const checkUserResponse = async () => {
      const userId = firebase.auth().currentUser.uid; // Getting current user's UID
      const userResponse = await getUserEventResponse(userId, event.id); // Getting user's response for the event
      setUserResponse(userResponse); // Setting user's response in state
    };
    checkUserResponse(); // Calling checkUserResponse function
  }, [event.id]); // Effect runs when event ID changes

  // Function to format date from timestamp
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return '';
    }
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  };

  // Function to check if the event has already passed
  const isEventPast = (timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return false;
    }
    const currentDate = new Date();
    const eventDate = timestamp.toDate();
    return currentDate > eventDate;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} inverted>
        {/* Displaying event details */}
        <ImageBackground source={{ uri: event.eventImage }} style={styles.imageBackground}>
          <Text style={styles.title}>{event.eventName}</Text>
        </ImageBackground>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailText}>{formatDate(event.eventDate)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailText}>{event.eventCity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailText}>{event.eventTime}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailText}>{event.eventDescription}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailText}>{event.eventType}</Text>
          </View>
        </View>
        {/* Displaying user's response */}
        {userResponse && (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>Your Response: {userResponse}</Text>
          </View>
        )}
        {/* Displaying response buttons if user hasn't responded and event is not past */}
        {!userResponse && !isEventPast(event.eventDate) && (
          <View style={styles.responseContainer}>
            <TouchableOpacity style={styles.responseButton} onPress={() => updateResponse('yes')}>
              <Text style={styles.responseButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.responseButton} onPress={() => updateResponse('maybe')}>
              <Text style={styles.responseButtonText}>Maybe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.responseButton} onPress={() => updateResponse('no')}>
              <Text style={styles.responseButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Displaying back button */}
        {(userResponse !== null || isEventPast(event.eventDate)) && (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

// Styles for EventDetailScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  imageBackground: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  detailText: {
    fontSize: 18,
    color: 'white',
  },
  responseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 200,
  },
  responseButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  responseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  responseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default EventDetailScreen; // Exporting EventDetailScreen component as default
