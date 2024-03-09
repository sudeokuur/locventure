import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import EventDetailComponent from '../components/EventDetail';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventsScreen from '../screens/EventsScreen';
import LetsGetStarted from '../screens/LetsGetStarted';
import LoginScreen from "../screens/LoginScreen";
import PastEventsScreen from '../screens/PastEventsScreen';
import ProfileScreen from "../screens/ProfileScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Tabs from './Tabs';
const Stack = createStackNavigator();

const MyStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={Tabs}/>
      <Stack.Screen name="LetsGetStarted" component={LetsGetStarted}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="Events" component={EventsScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="PastEvents" component={PastEventsScreen}/>
      <Stack.Screen name="EventDetail" component={EventDetailScreen}/>
      <Stack.Screen name="EventDetailComponent" component={EventDetailComponent} />
      

    </Stack.Navigator>
  );
}

export default MyStack;