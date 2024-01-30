import React from 'react';
import { Button, View } from 'react-native';
import EventDetail from '../components/EventDetail';

const EventDetailScreen: React.FC = ({navigation}) => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Back" onPress={() => navigation.navigate('Events')} />
      <EventDetail route={{
              params: {
                  event: {
                      id: '',
                      title: '',
                      date: '',
                      location: '',
                      description: undefined
                  }
              }
          }} />
    </View>
  );
};

export default EventDetailScreen;
