import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const ProfileScreen: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Fetch user data from Firestore
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('users').doc('USER_ID').get();
        const userData = userDoc.data();

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

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Update user profile in Firestore
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
      <Button title="Update Profile" onPress={handleUpdateProfile} color="purple" />
    </View>
  );
};

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

export default ProfileScreen;
