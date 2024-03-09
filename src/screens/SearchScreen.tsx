import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      // Update recent searches
      setRecentSearches(prevSearches => [...prevSearches, searchText]);
      // Perform search action with searchText
      console.log('Search for:', searchText);
      // Clear search input
      setSearchText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for something..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      <View style={styles.recentSearchesContainer}>
        <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
        <FlatList
          data={recentSearches}
          renderItem={({ item }) => <Text style={styles.recentSearch}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black', // Set background color to black
  },
  searchInput: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white', // Set input background color to white
  },
  recentSearchesContainer: {
    marginTop: 20,
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white', // Set title color to white
  },
  recentSearch: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white', // Set text color to white
  },
});

export default SearchScreen;
