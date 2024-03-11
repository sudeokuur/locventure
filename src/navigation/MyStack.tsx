import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import EventDetailScreen from '../screens/EventDetailScreen';
import HomePage from "../screens/HomePage";
import LetsGetStarted from '../screens/LetsGetStarted';
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Tabs from './Tabs';

const Stack = createStackNavigator();

const MyStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LetsGetStarted" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={Tabs}/>
      <Stack.Screen name="HomePage" component={HomePage}/>
      <Stack.Screen name="LetsGetStarted" component={LetsGetStarted}/>
      <Stack.Screen name="Search" component={SearchScreen}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="EventDetail" component={EventDetailScreen}/>      
    </Stack.Navigator>
  );
}

export default MyStack;
