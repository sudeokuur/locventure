import firestore from '@react-native-firebase/firestore'; // Import the Firestore module from Firebase
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState hooks
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'; // Import necessary components from react-native

// Functional component definition for ProfileScreen
const ProfileScreen: React.FC = () => {
  const [userName, setUserName] = useState(''); // State variable for user's name
  const [phoneNumber, setPhoneNumber] = useState(''); // State variable for user's phone number
  const [email, setEmail] = useState(''); // State variable for user's email
  const [location, setLocation] = useState(''); // State variable for user's location

  // Fetch user data from Firestore when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user document from Firestore using a specific user ID (replace 'USER_ID' with actual user ID)
        const userDoc = await firestore().collection('users').doc('USER_ID').get();
        const userData = userDoc.data(); // Extract user data from the document

        // If user data exists, set state variables with user data
        if (userData) {
          setUserName(userData.userName);
          setPhoneNumber(userData.phoneNumber);
          setEmail(userData.email);
          setLocation(userData.location);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the fetchUserData function
  }, []); // Empty dependency array ensures the effect runs only once, on component mount

  // Function to handle updating user profile in Firestore
  const handleUpdateProfile = async () => {
    try {
      // Update user profile in Firestore with the new data entered in the text inputs
      await firestore().collection('users').doc('USER_ID').update({
        userName,
        phoneNumber,
        email,
        location,
      });
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <Text style={styles.header}>Profile</Text>
      {/* Text input fields for user's name, phone number, email, and location */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      {/* Button to update user profile */}
      <Button title="Update Profile" onPress={handleUpdateProfile} color="purple" />
    </View>
  );
};

// Styles for ProfileScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'darkgray',
    borderRadius: 8,
    backgroundColor: 'darkgray',
    color: 'black',
  },
});

export default ProfileScreen; // Export ProfileScreen component as default
