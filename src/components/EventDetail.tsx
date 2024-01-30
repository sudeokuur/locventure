import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface EventDetailProps {
  route: {
    params: {
      event: {
        id: string;
        eventName: string; // Adjust property name to match what you use in Event component
        eventDate: string; // Adjust property name to match what you use in Event component
        eventLocation: string; // Adjust property name to match what you use in Event component
        eventDescription?: string; // Adjust property name to match what you use in Event component
        // Add other event properties as needed
      };
    };
  };
}

const EventDetail: React.FC<EventDetailProps> = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Text style={styles.goBackButtonText}>Geri Dön</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{event.eventName}</Text>
      <Text style={styles.date}>Date: {event.eventDate}</Text>
      <Text style={styles.location}>Location: {event.eventLocation}</Text>
      {event.eventDescription && (
        <Text style={styles.description}>Description: {event.eventDescription}</Text>
      )}
      {/* Add other event properties here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  goBackButton: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  goBackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 18,
    marginBottom: 4,
  },
  location: {
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default EventDetail;
