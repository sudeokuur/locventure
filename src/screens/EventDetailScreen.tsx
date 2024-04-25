import firebase from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// This function updates the event response in Firestore
const updateEventResponse = async (userId, eventId, response) => {
  try {
    if (response === undefined) {
      console.error('Response is undefined.');
      return;
    }

    const eventRef = firebase.firestore().collection('events').doc(eventId);
    await eventRef.update({
      [`responses.${userId}`]: response
    });
    
    console.log('Event response updated successfully');
  } catch (error) {
    console.error('Error updating event response:', error);
  }
};

// This function retrieves the user's response to the event from Firestore
const getUserEventResponse = async (userId, eventId) => {
  try {
    const eventRef = firebase.firestore().collection('events').doc(eventId);
    const eventDoc = await eventRef.get();
    if (eventDoc.exists) {
      const eventData = eventDoc.data();
      
      if (eventData.responses && eventData.responses[userId]) {
        return eventData.responses[userId];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user event response:', error);
    return null; 
  }
};

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();

  const [userResponse, setUserResponse] = useState(null);

  useEffect(() => {
    // Check if the current user has already responded to the event
    const checkUserResponse = async () => {
      const userId = firebase.auth().currentUser.uid;
      const userResponse = await getUserEventResponse(userId, event.id);
      setUserResponse(userResponse);
    };
    checkUserResponse();
  }, [event.id]);

  // Function to handle responding to the event
  const respondToEvent = async (response) => {
    try {
      const userId = firebase.auth().currentUser.uid;
      await updateEventResponse(userId, event.id, response);
      setUserResponse(response);
    } catch (error) {
      console.error('Error responding to event:', error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return '';
    }
    const date = timestamp.toDate();
    return date.toDateString(); // Use toDateString() to format the date
  };
  
  const isEventPast = (timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return false;
    }
    const currentDate = new Date();
    const eventDate = timestamp.toDate();
    return currentDate > eventDate;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      {userResponse && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Your Response: {userResponse}</Text>
        </View>
      )}
      {!userResponse && !isEventPast(event.eventDate) && (
        <View style={styles.responseContainer}>
          <TouchableOpacity style={styles.responseButton} onPress={() => respondToEvent('yes')}>
            <Text style={styles.responseButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.responseButton} onPress={() => respondToEvent('maybe')}>
            <Text style={styles.responseButtonText}>Maybe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.responseButton} onPress={() => respondToEvent('no')}>
            <Text style={styles.responseButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      )}
      {(userResponse !== null || isEventPast(event.eventDate)) && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
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
    flex: 0.4,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  detailText: {
    flex: 0.6,
    fontSize: 18,
    color: 'white',
  },
  responseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
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
    marginTop: 16,
    textAlign: 'center',
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

export default EventDetailScreen;
