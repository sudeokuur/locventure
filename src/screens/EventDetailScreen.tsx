import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import EventDetail from '../components/EventDetail';

const EventDetailScreen: React.FC = () => {
  const route = useRoute();
  const { event } = route.params || {};

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <EventDetail event={event} />
    </View>
  );
};

export default EventDetailScreen;
