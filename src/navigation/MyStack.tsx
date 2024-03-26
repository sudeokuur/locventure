import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EventDetailScreen from '../screens/EventDetailScreen';
import LetsGetStarted from '../screens/LetsGetStarted';
import LoginScreen from "../screens/LoginScreen";
import SelectedEventScreen from '../screens/SelectedEventScreen';
import SignUpScreen from "../screens/SignUpScreen";
import Tabs from './Tabs'; // Import your bottom tab navigator component

const Stack = createStackNavigator();

const MyStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {}
      <Stack.Screen name="LetsGetStarted" component={LetsGetStarted}/>

      {}
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="SelectedEventScreen" component={SelectedEventScreen}/>
      <Stack.Screen name="EventDetail" component={EventDetailScreen}/>      
      {}
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>

    </Stack.Navigator>
  );
}

export default MyStack;