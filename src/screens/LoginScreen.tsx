import auth from "@react-native-firebase/auth"; // Import the authentication module from Firebase
import firestore from "@react-native-firebase/firestore"; // Import the Firestore module from Firebase
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook from react-navigation
import React, { useState } from "react"; // Import React and useState hook
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"; // Import necessary components from react-native
import DefButton from "../components/DefButton"; // Import the DefButton component

// Functional component definition for LoginScreen
const LoginScreen = () => {
  const navigation = useNavigation(); // Access the navigation object using the useNavigation hook
  const [email, setEmail] = useState(""); // State variable for email input field
  const [password, setPassword] = useState(""); // State variable for password input field

  // Function to handle login with email and password
  const LoginWithEmailandPassword = async () => {
    try {
      // Sign in user with email and password
      const signInResult = await auth().signInWithEmailAndPassword(email, password);
      
      // If the user is new, save their email in Firestore
      if (signInResult.additionalUserInfo?.isNewUser) {
        const userDocRef = firestore().collection("users").doc(signInResult.user.uid);
        await userDocRef.set({
          email: signInResult.user.email,
        });
        console.log("User data saved in Firestore");
      }

      // Log the sign-in result and navigate to the main screen
      console.log(signInResult);
      Alert.alert("Logged in!");
      navigation.navigate("Main");
    } catch (error) {
      // Handle errors during login
      console.error(error);
      Alert.alert(error.nativeErrorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Navigate back to the LetsGetStarted screen */}
        <TouchableOpacity onPress={() => navigation.navigate("LetsGetStarted")}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        {/* Email input field */}
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter Email Address"
          style={styles.input}
        />
        {/* Password input field */}
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter Password"
          secureTextEntry
          style={styles.input}
        />
        {/* Sign In button */}
        <DefButton title={"Sign In"} onPress={LoginWithEmailandPassword} style={styles.loginButton} />
      </View>
    </View>
  );
};

// Styles for LoginScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    color: 'white',
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#333',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen; // Export LoginScreen component as default
