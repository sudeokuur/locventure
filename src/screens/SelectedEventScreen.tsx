//this screen is for Categories. When a category selected, this screen comes
//if there is an event found for category, it brings the event. else, it throws an exception about there is no event for the selected category.
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
              {<Text>Location: {event.eventCity}</Text>}
            </View>
          ))
        ) : (
          <Text style={styles.noEventsText}>No events found for {category} category.</Text>
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