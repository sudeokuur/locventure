// Importing necessary components and functions from React and React Native
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Importing category images
import campingIcon from '../assets/categories/camping.png';
import concertIcon from '../assets/categories/concert.png';
import familyFriendlyIcon from '../assets/categories/familyfriendly.png';
import festivalIcon from '../assets/categories/festival.png';
import outdoorIcon from '../assets/categories/outdoor.png';
import partyIcon from '../assets/categories/party.png';
import sportIcon from '../assets/categories/sport.png';
import theatreIcon from '../assets/categories/theatre.png';

// Interface defining props for Categories component
interface CategoriesProps {
  onSelectCategory: (category: string) => void; // Function to handle category selection
}

// Functional component definition for Categories
const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const navigation = useNavigation(); // Initializing navigation hook

  // Function to handle category selection
  const handleCategorySelect = (category: string) => {
    onSelectCategory(category); // Calling onSelectCategory prop with selected category
    // Navigating to SelectedEventScreen with the selected category
    navigation.navigate('SelectedEventScreen', { eventType: category });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TouchableOpacity components for each category */}
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Party')} // Handling press for Party category
      >
        <Image source={partyIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Concert')} // Handling press for Concert category
      >
        <Image source={concertIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Theater')} // Handling press for Theater category
      >
        <Image source={theatreIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Camping')} // Handling press for Camping category
      >
        <Image source={campingIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('FamilyFriendly')} // Handling press for FamilyFriendly category
      >
        <Image source={familyFriendlyIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Sport')} // Handling press for Sport category
      >
        <Image source={sportIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Festival')} // Handling press for Festival category
      >
        <Image source={festivalIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Outdoor')} // Handling press for Outdoor category
      >
        <Image source={outdoorIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      {/* Additional TouchableOpacity components for other categories can be added here */}
    </ScrollView>
  );
};

// Styles for Categories component
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Setting background color to black
  },
  categoryButton: {
    margin: 5, // Setting margin for category buttons
  },
  categoryImage: {
    width: 300, // Setting width for category images
    height: 110, // Setting height for category images
    borderRadius: 40, // Setting border radius for category images
  },
});

export default Categories; // Exporting Categories component as default
