import React from 'react';
import { createStackNavigator} from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"
import SignUpScreen from "../screens/SignUpScreen"
import ProfileScreen from "../screens/ProfileScreen";
import Tabs from './Tabs';
import EventsScreen from '../screens/EventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import PastEventsScreen from '../screens/PastEventsScreen';
import EventDetailComponent from '../components/EventDetail';
const Stack = createStackNavigator();

const MyStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={Tabs}/>
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