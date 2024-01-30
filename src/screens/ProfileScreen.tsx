// ProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Firestore'dan kullanıcı bilgilerini al
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
        console.error('Kullanıcı bilgileri getirilirken hata oluştu:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Firestore'a güncellenmiş kullanıcı bilgilerini kaydet
      await firestore().collection('users').doc('USER_ID').update({
        userName,
        phoneNumber,
        email,
        location,
      });
      console.log('Profil bilgileri güncellendi!');
    } catch (error) {
      console.error('Profil bilgileri güncellenirken hata oluştu:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
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
        placeholder="Lokasyon"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <Button title="Profil Güncelle" onPress={handleUpdateProfile} />
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
  },
  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default ProfileScreen;
