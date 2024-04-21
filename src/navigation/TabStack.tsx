import { createStackNavigator } from '@react-navigation/stack'; // Importing createStackNavigator from react-navigation/stack
import React from 'react'; // Importing React library
import Tabs from './Tabs'; // Importing Tabs component from './Tabs'

const Stack = createStackNavigator(); // Creating a stack navigator

// Functional component definition for TabStack
const TabStack: React.FC = () => {
  return (
    <Stack.Navigator> {/* Creating a stack navigator */}
      <Stack.Screen
        name="MainTabs" // Name of the screen
        component={Tabs} // Component to render - Tabs component
        options={{ headerShown: false }} // Options for the screen - hiding the header for the tabs
      />
    </Stack.Navigator>
  );
};

export default TabStack; // Exporting TabStack component as default
