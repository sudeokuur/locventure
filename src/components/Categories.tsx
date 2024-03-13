import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Import category images
import campingIcon from '../assets/categories/camping.png';
import concertIcon from '../assets/categories/concert.png';
import familyFriendlyIcon from '../assets/categories/familyfriendly.png';
import festivalIcon from '../assets/categories/festival.png';
import outdoorIcon from '../assets/categories/outdoor.png';
import partyIcon from '../assets/categories/party.png';
import sportIcon from '../assets/categories/sport.png';
import theatreIcon from '../assets/categories/theatre.png';
//yaşasın
interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const handleCategorySelect = (category: string) => {
    onSelectCategory(category);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Party')}
      >
        <Image source={partyIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Concert')}
      >
        <Image source={concertIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Theater')}
      >
        <Image source={theatreIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Camping')}
      >
        <Image source={campingIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('FamilyFriendly')}
      >
        <Image source={familyFriendlyIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Sport')}
      >
        <Image source={sportIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Festival')}
      >
        <Image source={festivalIcon} style={styles.categoryImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('Outdoor')}
      >
        <Image source={outdoorIcon} style={styles.categoryImage} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Set background color to black
  },
  categoryButton: {
    margin: 5,
  },
  categoryImage: {
    width: 220,
    height: 100,
    borderRadius: 40,
  },
});

export default Categories;
