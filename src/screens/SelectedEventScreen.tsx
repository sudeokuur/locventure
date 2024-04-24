import { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const SelectedEventScreen: React.FC<{ route: { params: { category: string } } }> = ({ route }) => {
  const { category } = route.params;
  const [selectedCategoryEvents, setSelectedCategoryEvents] = useState<any[]>([]);

  useEffect(() => {
    if (category) {
      fetchEventsForCategory(category);
    }
  }, [category]);

  const fetchEventsForCategory = async (eventType: string) => {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('events').where('eventType', '==', eventType).get();
      const categoryEventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setSelectedCategoryEvents(categoryEventsData);
    } catch (error) {
      console.error('Error fetching events for category:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Category Events</Text>
        {selectedCategoryEvents.length > 0 ? (
          selectedCategoryEvents.map(event => (
            <View key={event.id} style={styles.eventItem}>
              <Text style={styles.eventName}>{event.eventName}</Text>
              {/* Render other event details */}
              {<Text>Location: {event.eventLocation}</Text>}
            </View>
          ))
        ) : (
<<<<<<< HEAD
<<<<<<< HEAD
          <Text style={styles.noEventsText}>No events found for {category} category.</Text> /* Text indicating no events found for the category */
=======
          <Text style={styles.noEventsText}>No events found for {category} category.</Text>
>>>>>>> parent of 5b0fbce5 (command lines added as supervisor wanted for code review.)
=======
          <Text style={styles.noEventsText}>No events found for {category} category.</Text> {/* Text indicating no events found for the category */}
>>>>>>> parent of c849690f (fix commit)
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  eventItem: {
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#333333',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  noEventsText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SelectedEventScreen;