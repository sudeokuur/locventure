import { firebase } from '@react-native-firebase/firestore'; // Importing firebase from @react-native-firebase/firestore
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook from @react-navigation/native
import React, { useState } from 'react'; // Importing React and useState from React library
import { StyleSheet, Text, View } from 'react-native'; // Importing necessary components from react-native
import Categories from '../components/Categories'; // Importing Categories component from '../components/Categories'

// Functional component definition for CategoriesScreen
const CategoriesScreen: React.FC = () => {
  const [error, setError] = useState<string>(''); // State to manage error messages
  const navigation = useNavigation(); // Initializing navigation hook

  // Function to fetch events for a specific category from Firestore
  const fetchEventsForCategory = async (eventType: string) => {
    try {
      const db = firebase.firestore(); // Accessing Firestore instance
      const snapshot = await db.collection('events').where('eventType', '==', eventType).get(); // Querying events collection for the selected category
      const categoryEventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapping fetched data

      console.log('categoryEventsData:', categoryEventsData); // Logging categoryEventsData

      if (categoryEventsData.length === 0) { // If no events found for the category
        setError(`No events found for category: ${eventType}`);
      } else { // If events found for the category
        setError('');
        // Navigate to SelectedEventScreen with the selected category
        navigation.navigate('SelectedEventScreen', { category: eventType });
      }
    } catch (error) {
      console.error('Error fetching events for category:', error); // Logging error if any
      setError('Error fetching events. Please try again later.'); // Setting error state
    }
  };

  // Function to handle category selection
  const handleCategorySelect = (category: string) => {
    fetchEventsForCategory(category); // Call fetchEventsForCategory with the selected category
  };

  return (
    <View style={styles.container}>
      <Categories onSelectCategory={handleCategorySelect} /> {/* Render Categories component with onSelectCategory prop */}
      {/* Display error message if any */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

// Styles for CategoriesScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black', // Setting background color to black
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red', // Setting text color to red
  },
});

export default CategoriesScreen; // Exporting CategoriesScreen component as default
