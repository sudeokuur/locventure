import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Tabs from './Tabs';
const Stack = createStackNavigator();

const TabStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={Tabs}
        options={{ headerShown: false }} // Hide the header for the tabs
      />
    </Stack.Navigator>
  );
};

export default TabStack;
