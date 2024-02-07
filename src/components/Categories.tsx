import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const handleCategorySelect = (category: string) => {
    onSelectCategory(category);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('concert')}
      >
        <Text style={styles.categoryText}>Concert</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('theatre')}
      >
        <Text style={styles.categoryText}>Theatre</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('sport')}
      >
        <Text style={styles.categoryText}>Sport</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('dinner')}
      >
        <Text style={styles.categoryText}>Dinner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => handleCategorySelect('festival')}
      >
        <Text style={styles.categoryText}>Festival</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 18,
  },
});

export default Categories;
