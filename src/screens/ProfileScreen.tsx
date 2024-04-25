import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const ProfileScreen: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Fetch current user data from Firestore
    const fetchCurrentUser = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
          const userData = userDoc.data();

          if (userData) {
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
            setEmail(userData.email || '');
            setLocation(userData.location || '');
          }
        }
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await firestore().collection('users').doc(currentUser.uid).update({
          firstName,
          lastName,
          email,
          location,
        });
        console.log('Profile updated successfully!');
      } else {
        console.log('No user is currently authenticated.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <Text style={styles.header}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
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
      <Button title="Update Profile" onPress={handleUpdateProfile} color="#D070FC" />
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
    color: '#CF63FF',
  },
  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'darkgray',
    borderRadius: 8,
    backgroundColor: '#D9C7E1',
    color: 'black',
  },
});

export default ProfileScreen;
