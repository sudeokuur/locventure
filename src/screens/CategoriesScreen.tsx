import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Categories from '../components/Categories';

const CategoriesScreen: React.FC = () => {
  const [error, setError] = useState<string>('');
  const navigation = useNavigation();

  const fetchEventsForCategory = async (eventType: string) => {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('events').where('eventType', '==', eventType).get();
      const categoryEventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log('categoryEventsData:', categoryEventsData); // Log categoryEventsData

      if (categoryEventsData.length === 0) {
        setError(`No events found for category: ${eventType}`);
      } else {
        setError('');
        // Navigate to SelectedEventScreen with the category events data
        navigation.navigate('SelectedEventScreen', { events: categoryEventsData });
      }
    } catch (error) {
      console.error('Error fetching events for category:', error);
    }
  };

  const handleCategorySelect = (category: string) => {
    fetchEventsForCategory(category);
  };

  return (
    <View style={styles.container}>
      <Categories onSelectCategory={handleCategorySelect} />
      {/* Display error message if any */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default CategoriesScreen;
