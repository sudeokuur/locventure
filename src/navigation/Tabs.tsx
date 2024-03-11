import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import HomePage from '../screens/HomePage';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black' }, // Set background color to black
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/homebutton.png')}
            />
          ),
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/searchbutton.png')}
            />
          ),
          tabBarLabel: 'Search'
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/categorybutton.png')}
            />
          ),
          tabBarLabel: 'Categories'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/profilelogo.jpg')}
            />
          ),
          tabBarLabel: 'Profile'
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 32, 
    height: 32, 
  },
});

export default Tabs;
