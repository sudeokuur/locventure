import { firebase } from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Categories from '../components/Categories';

const CategoriesScreen: React.FC = () => {
  const [categoryEvents, setCategoryEvents] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const fetchEventsForCategory = async (eventType: string) => {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('events').where('eventType', '==', eventType).get();
      const categoryEventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      if (categoryEventsData.length === 0) {
        setError(`No events found for category: ${eventType}`);
      } else {
        setError('');
        setCategoryEvents(categoryEventsData);
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
          <View key={event.id} style={styles.eventItem}>
            <Text style={styles.eventName}>{event.eventName}</Text>
            <Text>Date: {event.eventDate.toDate().toLocaleDateString()}</Text>
            <Text>Location: {event.eventLocation}</Text>
          </View>
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
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default CategoriesScreen;
