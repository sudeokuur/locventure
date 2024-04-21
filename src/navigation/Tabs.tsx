import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Importing createBottomTabNavigator from react-navigation/bottom-tabs
import React from 'react'; // Importing React library
import { Image, StyleSheet } from 'react-native'; // Importing necessary components from react-native
import CategoriesScreen from '../screens/CategoriesScreen'; // Importing CategoriesScreen component
import HomePage from '../screens/HomePage'; // Importing HomePage component
import ProfileScreen from '../screens/ProfileScreen'; // Importing ProfileScreen component
import SearchScreen from '../screens/SearchScreen'; // Importing SearchScreen component

const Tab = createBottomTabNavigator(); // Creating a bottom tab navigator

// Functional component definition for Tabs
const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black' }, // Styling for the bottom tab bar - setting background color to black
      }}
    >
      {/* Home tab */}
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/homebutton.png')} // Icon for Home tab
            />
          ),
          tabBarLabel: 'Home' // Label for Home tab
        }}
      />
      {/* Search tab */}
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/searchbutton.png')} // Icon for Search tab
            />
          ),
          tabBarLabel: 'Search' // Label for Search tab
        }}
      />
      {/* Categories tab */}
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/categorybutton.png')} // Icon for Categories tab
            />
          ),
          tabBarLabel: 'Categories' // Label for Categories tab
        }}
      />
      {/* Profile tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/profilelogofortab.jpg')} // Icon for Profile tab
            />
          ),
          tabBarLabel: 'Profile' // Label for Profile tab
        }}
      />
    </Tab.Navigator>
  );
};

// Styles for Tabs component
const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 32, // Width of tab icon
    height: 32, // Height of tab icon
  },
});

export default Tabs; // Exporting Tabs component as default
