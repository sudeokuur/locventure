import { firebase } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Categories from '../components/Categories';
import Event from '../components/Event'; // Import your Event component

const CategoriesScreen: React.FC = () => {
  const [categoryEvents, setCategoryEvents] = useState<any[]>([]);
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
        setCategoryEvents(categoryEventsData);
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
      {/* Display category events or error message */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        categoryEvents.map(event => (
          <TouchableOpacity key={event.id} style={styles.eventItem}>
            {/* Render each event using the Event component */}
            <Event event={event} />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  eventItem: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default CategoriesScreen;
