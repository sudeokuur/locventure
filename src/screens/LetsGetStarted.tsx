import { useNavigation } from '@react-navigation/native'; // Import the hook
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LetsGetStarted: React.FC = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LocaleVenture</Text>
      <Image source={require('../assets/letsgetstarted.png')} style={styles.image} />
      <Text style={styles.description}>Discover local events, plan outings, and stay connected. Let's get started!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
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
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LetsGetStarted;
