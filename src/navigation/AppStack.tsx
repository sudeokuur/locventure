import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EventDetailScreen from '../screens/EventDetailScreen';
import LetsGetStarted from '../screens/LetsGetStarted';
import LoginScreen from "../screens/LoginScreen";
import RateEventScreen from '../screens/RateEventScreen';
import SelectedEventScreen from '../screens/SelectedEventScreen';
import SignUpScreen from "../screens/SignUpScreen";
import TabStack from './TabStack';

const Stack = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* LetsGetStarted is the first screen */}
      <Stack.Screen name="LetsGetStarted" component={LetsGetStarted} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />



      {/* MainStack includes both TabStack and other screens */}
      <Stack.Screen name="Main" component={MainStack} />
    </Stack.Navigator>
  );
}

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* TabStack includes the bottom tabs */}
      <Stack.Screen name="TabStack" component={TabStack} />

      {/* Other screens */}
      <Stack.Screen name="SelectedEventScreen" component={SelectedEventScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="RateEvent" component={RateEventScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AppStack;
