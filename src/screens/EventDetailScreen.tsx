// EventDetailScreen.tsx

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
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
