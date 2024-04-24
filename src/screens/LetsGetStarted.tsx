import { useNavigation } from '@react-navigation/native'; // Import the hook
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DefButton from '../components/DefButton';
const LetsGetStarted: React.FC = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LocaleVenture</Text>
      <Image source={require('../assets/letsgetstarted.png')} style={styles.image} />
      <Text style={styles.description}>Discover local events, plan outings, and stay connected. Let's get started!</Text>
      <View style={styles.buttonContainer}>
        <DefButton title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
        <Text>           </Text>
        <DefButton title="Sign In" onPress={() => navigation.navigate("Login")} />
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
    flexDirection: 'row',
  },
});

export default LetsGetStarted;
