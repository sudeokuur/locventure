import { createStackNavigator } from '@react-navigation/stack'; // Importing createStackNavigator from react-navigation/stack
import React from 'react'; // Importing React library
import EventDetailScreen from '../screens/EventDetailScreen'; // Importing EventDetailScreen component
import LetsGetStarted from '../screens/LetsGetStarted'; // Importing LetsGetStarted component
import LoginScreen from "../screens/LoginScreen"; // Importing LoginScreen component
import RateEventScreen from '../screens/RateEventScreen'; // Importing RateEventScreen component
import SelectedEventScreen from '../screens/SelectedEventScreen'; // Importing SelectedEventScreen component
import SignUpScreen from "../screens/SignUpScreen"; // Importing SignUpScreen component
import TabStack from './TabStack'; // Importing TabStack component

const Stack = createStackNavigator(); // Creating a stack navigator

// Functional component definition for AppStack
const AppStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> {/* Creating a stack navigator with no header */}
      {/* LetsGetStarted is the first screen */}
      <Stack.Screen name="LetsGetStarted" component={LetsGetStarted} /> {/* Setting LetsGetStarted as the first screen */}
      <Stack.Screen name="Login" component={LoginScreen} /> {/* Setting LoginScreen as a screen */}
      <Stack.Screen name="SignUp" component={SignUpScreen} /> {/* Setting SignUpScreen as a screen */}

      {/* MainStack includes both TabStack and other screens */}
      <Stack.Screen name="Main" component={MainStack} /> {/* Setting MainStack as a screen */}
    </Stack.Navigator>
  );
}

// Functional component definition for MainStack
const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}> {/* Creating a stack navigator with no header */}
      {/* TabStack includes the bottom tabs */}
      <Stack.Screen name="TabStack" component={TabStack} /> {/* Setting TabStack as a screen, which includes bottom tabs */}

      {/* Other screens */}
      <Stack.Screen name="SelectedEventScreen" component={SelectedEventScreen} /> {/* Setting SelectedEventScreen as a screen */}
      <Stack.Screen name="EventDetail" component={EventDetailScreen} /> {/* Setting EventDetailScreen as a screen */}
      <Stack.Screen name="RateEvent" component={RateEventScreen} /> {/* Setting RateEventScreen as a screen */}
      <Stack.Screen name="Login" component={LoginScreen} /> {/* Setting LoginScreen as a screen */}
    </Stack.Navigator>
  );
}

export default AppStack; // Exporting AppStack component as default
