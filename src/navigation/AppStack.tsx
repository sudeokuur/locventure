import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EventDetailScreen from '../screens/EventDetailScreen';
import HomePage from '../screens/HomePage';
import LetsGetStarted from '../screens/LetsGetStarted';
import LoginScreen from "../screens/LoginScreen";
import RateEventScreen from '../screens/RateEventScreen';
import SelectedEventScreen from '../screens/SelectedEventScreen';
import SignUpScreen from "../screens/SignUpScreen";
import Tabs from './Tabs'; // Import your bottom tab navigator component

const Stack = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {}
      <Stack.Screen name="Tabs" component={Tabs} />


      {}
      <Stack.Screen name="LetsGetStarted" component={LetsGetStarted}/>
      <Stack.Screen name="SelectedEventScreen" component={SelectedEventScreen}/>
      <Stack.Screen name="EventDetail" component={EventDetailScreen}/>      
      {}
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="HomePage" component={HomePage}/>
      <Stack.Screen name="RateEvent" component={RateEventScreen}/>


    </Stack.Navigator>
  );
}

export default AppStack;