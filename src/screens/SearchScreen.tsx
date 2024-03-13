import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Fetch recent searches from storage or initialize an empty array
    const storedRecentSearches = []; // Retrieve recent searches from storage, if any
    setRecentSearches(storedRecentSearches);
  }, []);

  const handleSearch = async () => {
    if (searchText.trim() !== '') {
      try {
        const db = firestore();
        const snapshot = await db.collection('events').get();
        const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Filter events based on search text
        const filteredEvents = eventsData.filter(event =>
          event.eventName.toLowerCase().includes(searchText.toLowerCase())
        );
        
        setSearchResults(filteredEvents);

        // Add search query to recent searches
        setRecentSearches(prevSearches => [...prevSearches, searchText]);

        // Save recent searches to storage
        // Update storage with updated recent searches array
      } catch (error) {
        console.error('Error fetching events from Firestore:', error);
      }
    }
  };

  const clearRecentSearches = () => {
    // Clear recent searches array and storage
    setRecentSearches([]);
    // Clear recent searches from storage
  };

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
        onChangeText={text => setSearchText(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.recentSearchesContainer}>
        <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
        <FlatList
          data={recentSearches}
          renderItem={({ item }) => <Text style={styles.recentSearch}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button title="Clear Recent Searches" onPress={clearRecentSearches} />
      </View>
    </View>
  );
};

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

export default SearchScreen;
