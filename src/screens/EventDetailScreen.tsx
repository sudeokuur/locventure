import firebase from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Firestore'da saklanacak veri modeli
// Firestore'da saklanacak veri modeli
interface EventResponse {
  userId: string; // Kullanıcının kimlik bilgisi
  eventId: string; // Etkinliğin kimlik bilgisi
  response: 'yes' | 'maybe' | 'no'; // Yanıt seçeneği
}

// Kullanıcının yanıtlarını güncellemek için Firestore işlevi
const updateEventResponse = async (userId: string, eventId: string, response: 'yes' | 'maybe' | 'no') => {
  try {
    // Firestore'daki uygun koleksiyona yanıtı ekleyin veya güncelleyin
    await firebase.firestore().collection('eventResponses').doc(userId + eventId).set({
      userId,
      eventId,
      response,
    });
    console.log('Event response updated successfully!');
  } catch (error) {
    console.error('Error updating event response:', error);
  }
};

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();

  const [response, setResponse] = useState(null);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  };

  const updateResponse = async (response) => {
    const userId = firebase.auth().currentUser.uid;
    await updateEventResponse(userId, event.id, response);
    setResponse(response);
  };
  const isEventPast = (timestamp) => {
    const currentDate = new Date();
    const eventDate = timestamp.toDate();
    return currentDate > eventDate;
  };



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} inverted>
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
            <Text style={styles.detailText}>{event.eventLocation}</Text>
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
        {!response && !isEventPast(event.eventDate) && (
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
        {(response !== null || isEventPast(event.eventDate)) && (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

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
    marginTop: 16,
  },
  responseButton: {
    backgroundColor: 'purple',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  responseButtonText: {
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

export default EventDetailScreen;
