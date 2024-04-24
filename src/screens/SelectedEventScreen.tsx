import { firebase } from '@react-native-firebase/firestore'; // Import firebase from @react-native-firebase/firestore
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState
import { ScrollView, StyleSheet, Text, View } from 'react-native'; // Import necessary components from react-native

// Functional component definition for SelectedEventScreen
const SelectedEventScreen: React.FC<{ route: { params: { category: string } } }> = ({ route }) => {
  const { category } = route.params; // Destructure the category from route params
  const [selectedCategoryEvents, setSelectedCategoryEvents] = useState<any[]>([]); // State variable for selected category events, initialized to an empty array

  useEffect(() => {
    if (category) { // Check if category exists
      fetchEventsForCategory(category); // Call fetchEventsForCategory function with the category as argument
    }
  }, [category]); // Run this effect whenever category changes

  // Function to fetch events for a specific category
  const fetchEventsForCategory = async (eventType: string) => {
    try {
      const db = firebase.firestore(); // Get firestore instance
      const snapshot = await db.collection('events').where('eventType', '==', eventType).get(); // Query events collection for events of the specified category
      const categoryEventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map documents to array of objects
      
      setSelectedCategoryEvents(categoryEventsData); // Update selected category events state with fetched events
    } catch (error) {
      console.error('Error fetching events for category:', error); // Log error if fetching events fails
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}> {/* ScrollView to contain the content */}
      <View style={styles.section}> {/* View for the section */}
        <Text style={styles.sectionTitle}>Selected Category Events</Text> {/* Text displaying the section title */}
        {selectedCategoryEvents.length > 0 ? ( // Conditionally render based on the length of selected category events array
          selectedCategoryEvents.map(event => ( // Map over the selected category events array
            <View key={event.id} style={styles.eventItem}> {/* View for each event item */}
              <Text style={styles.eventName}>{event.eventName}</Text> {/* Text displaying the event name */}
              {/* Render other event details */}
              {<Text>Location: {event.eventLocation}</Text>} {/* Text displaying the event location */}
            </View>
          ))
        ) : (
          <Text style={styles.noEventsText}>No events found for {category} category.</Text> /* Text indicating no events found for the category */
        )}
      </View>
    </ScrollView>
  );
};

// Styles for SelectedEventScreen component
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

export default SelectedEventScreen; // Export SelectedEventScreen component as default
