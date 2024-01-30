
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Event from '../components/Event';
// Mock data
const mockEvents = [
  { id: '1', title: 'Geçmiş Etkinlik 1', date: '2024-01-28', location: 'Lokasyon 1' },
  { id: '2', title: 'Geçmiş Etkinlik 2', date: '2024-01-29', location: 'Lokasyon 2' },
  { id: '3', title: 'Geçmiş Etkinlik 3', date: '2024-01-30', location: 'Lokasyon 3' },
  // ... Diğer etkinlikler
];

const PastEventsScreen: React.FC = () => {
  const renderItem = ({ item }: { item: { id: string; title: string; date: string; location: string } }) => (
    <Event title={item.title} date={item.date} location={item.location} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default PastEventsScreen;
