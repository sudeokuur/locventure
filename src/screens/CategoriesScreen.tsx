import React from 'react';
import { View, StyleSheet } from 'react-native';
import Categories from '../components/Categories';

const CategoriesScreen: React.FC = () => {
  const handleCategorySelect = (category: string) => {
    console.log('Selected category:', category);
    // Implement logic to fetch events based on the selected category
  };

  return (
    <View style={styles.container}>
      <Categories onSelectCategory={handleCategorySelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CategoriesScreen;
