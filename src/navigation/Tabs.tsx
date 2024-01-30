import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PastEventsScreen from '../screens/PastEventsScreen';
import RoutesScreen from '../screens/RoutesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventsScreen from '../screens/EventsScreen';

const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Past Events" component={PastEventsScreen} />
      <Tab.Screen name="Routes" component={RoutesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;