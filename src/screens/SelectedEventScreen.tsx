import { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const SelectedEventScreen: React.FC = () => {
  const [selectedCategoryEvents, setSelectedCategoryEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEventsForCategory('Concert');
  }, []);

  const fetchEventsForCategory = async (eventType: string) => {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection('events').where('eventType', '==', eventType).get();
      const categoryEventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setSelectedCategoryEvents(categoryEventsData);
    } catch (error) {
      console.error('Error fetching eventsssssss for category:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Category Events</Text>
        {selectedCategoryEvents.map(event => (
          <View key={event.id} style={styles.eventItem}>
            <Text style={styles.eventName}>{event.eventName}</Text>
            {/* Render other event details */}
            {<Text>Location: {event.eventLocation}</Text> }
          </View>
        ))}
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
});

export default SelectedEventScreen;
