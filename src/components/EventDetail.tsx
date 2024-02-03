// EventDetailComponent.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface EventDetailProps {
  route: {
    params?: {
      event?: {
        id: string;
        eventName: string;
        eventDate: string;
        eventLocation: string;
        eventDescription?: string;
      };
    };
  };
}

const EventDetailComponent: React.FC<EventDetailProps> = ({ route }) => {
  const { event } = route.params || {};
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!event) {
    // Handle the case where event is not defined
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event details not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.eventName}</Text>
      <Text style={styles.details}>Date: {event.eventDate}</Text>
      <Text style={styles.details}>Location: {event.eventLocation}</Text>
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

export default EventDetailComponent;
