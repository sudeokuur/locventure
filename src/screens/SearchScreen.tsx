import firestore from '@react-native-firebase/firestore'; // Import firestore from @react-native-firebase
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState
import { Button, FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Import necessary components from react-native

// Functional component definition for SearchScreen
const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>(''); // State variable for search text, initialized to an empty string
  const [searchResults, setSearchResults] = useState<any[]>([]); // State variable for search results, initialized to an empty array
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // State variable for recent searches, initialized to an empty array

  useEffect(() => {
    // Fetch recent searches from storage or initialize an empty array
    const storedRecentSearches = []; // Retrieve recent searches from storage, if any
    setRecentSearches(storedRecentSearches); // Update recent searches state with retrieved recent searches
  }, []);

  // Function to handle search
  const handleSearch = async () => {
    if (searchText.trim() !== '') { // Check if search text is not empty
      try {
        const db = firestore(); // Get firestore instance
        const snapshot = await db.collection('events').get(); // Get all documents from 'events' collection
        const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map documents to array of objects
        
        // Filter events based on search text
        const filteredEvents = eventsData.filter(event =>
          event.eventName.toLowerCase().includes(searchText.toLowerCase()) // Filter events whose name contains the search text (case insensitive)
        );
        
        setSearchResults(filteredEvents); // Update search results state with filtered events

        // Add search query to recent searches
        setRecentSearches(prevSearches => [...prevSearches, searchText]); // Add search text to recent searches state

        // Save recent searches to storage
        // Update storage with updated recent searches array
      } catch (error) {
        console.error('Error fetching events from Firestore:', error);
      }
    }
  };

  // Function to clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]); // Clear recent searches state
    // Clear recent searches from storage
  };

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.eventItem}>
      <ImageBackground
        source={{ uri: item.eventImage }}
        style={styles.background}
        imageStyle={{ borderRadius: 8 }}
      >
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text style={{ color: 'white' }}>Date: {item.eventDate.toDate().toLocaleDateString()}</Text>
        <Text style={{ color: 'white' }}>Location: {item.eventLocation}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for an event..."
        value={searchText}
        onChangeText={text => setSearchText(text)} // Call setSearchText with the entered text onChangeText
      />
      <Button title="Search" onPress={handleSearch} /> // Search button onPress calls handleSearch
      <FlatList
        data={searchResults}
        renderItem={renderItem} // Render each item using renderItem function
        keyExtractor={item => item.id} // Extract unique keys from item ids
      />
      <View style={styles.recentSearchesContainer}>
        <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
        <FlatList
          data={recentSearches}
          renderItem={({ item }) => <Text style={styles.recentSearch}>{item}</Text>} // Render each recent search
          keyExtractor={(item, index) => index.toString()} // Extract unique keys for recent searches
        />
        <Button title="Clear Recent Searches" onPress={clearRecentSearches} /> // Clear recent searches button onPress calls clearRecentSearches
      </View>
    </View>
  );
};

// Styles for SearchScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  searchInput: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  eventItem: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "white",
  },
  recentSearchesContainer: {
    marginTop: 20,
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  recentSearch: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
  },
  background: {
    padding: 36,
    backgroundColor: 'transparent'
  },
});

export default SearchScreen; // Export SearchScreen component as default
