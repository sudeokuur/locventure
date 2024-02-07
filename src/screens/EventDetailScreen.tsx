// EventDetailScreen.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventDetailComponent from '../components/EventDetail';

const Stack = createStackNavigator();

const EventDetailScreen: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EventDetailComponent" component={EventDetailComponent }/>
    </Stack.Navigator>
  );
};

export default EventDetailScreen;
