import { useNavigation } from '@react-navigation/native'; // Import the hook to access navigation
import React from 'react'; // Import React
import { Image, StyleSheet, Text, View } from 'react-native'; // Import necessary components from react-native
import DefButton from '../components/DefButton'; // Import the DefButton component

// Functional component definition for LetsGetStarted screen
const LetsGetStarted: React.FC = () => {
  const navigation = useNavigation(); // Access the navigation object using the useNavigation hook

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LocaleVenture</Text> {/* Display app title */}
      <Image source={require('../assets/letsgetstarted.png')} style={styles.image} /> {/* Display an image */}
      <Text style={styles.description}>Discover local events, plan outings, and stay connected. Let's get started!</Text> {/* Display a description */}
      <View style={styles.buttonContainer}>
        {/* Render Sign Up button */}
        <DefButton title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
        <Text>           </Text> {/* Add some space between buttons */}
        {/* Render Sign In button */}
        <DefButton title="Sign In" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
};

// Styles for LetsGetStarted component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
  },
});

export default LetsGetStarted; // Export LetsGetStarted component as default
