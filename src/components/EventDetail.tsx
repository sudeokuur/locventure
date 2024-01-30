// EventDetail.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface EventDetailProps {
  route: {
    params: {
      event: {
        id: string;
        title: string;
        date: string;
        location: string;
        description?: string;
        // Diğer etkinlik özelliklerini ekleyebilirsiniz
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
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>Date: {event.date}</Text>
      <Text style={styles.location}>Location: {event.location}</Text>
      {event.description && (
        <Text style={styles.description}>Description: {event.description}</Text>
      )}
      {/* Diğer bilgileri buraya ekleyebilirsiniz */}
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
