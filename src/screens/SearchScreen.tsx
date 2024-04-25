import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigation = useNavigation(); // Get navigation object

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

  const navigateToEventDetail = (eventId) => {
    navigation.navigate('EventDetailScreen', { eventId }); // Navigate to EventDetailScreen with event ID
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.eventItem} onPress={() => navigateToEventDetail(item.id)}>
      <ImageBackground
        source={{ uri: item.eventImage }}
        style={styles.background}
        imageStyle={{ borderRadius: 8 }}
      >
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text style={{ color: 'white' }}>Date: {item.eventDate.toDate().toLocaleDateString()}</Text>
        <Text style={{ color: 'white' }}>Location: {item.eventCity}</Text>
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
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
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
        <TouchableOpacity style={styles.clearButton} onPress={clearRecentSearches}>
          <Text style={styles.clearButtonText}>Clear Recent Searches</Text>
        </TouchableOpacity>
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
    borderColor: 'black',
    borderRadius: 8,
    fontWeight: 'bold',
    backgroundColor: '#F0CDFF',
    color: 'white',
  },
  searchButton: {
    backgroundColor: '#CF63FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventItem: {
    marginBottom: 16,
    padding: 15,
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
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
  clearButton: {
    backgroundColor: '#FF8CF3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  background: {
    padding: 36,
    backgroundColor: 'transparent'
  },
});

export default SearchScreen;
