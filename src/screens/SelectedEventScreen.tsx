import { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SelectedEventScreen: React.FC<{ route: any }> = ({ route }) => {
  const { events } = route.params;
  const [selectedCategoryEvents, setSelectedCategoryEvents] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(events)) {
      setSelectedCategoryEvents(events);
    } else {
      console.error('Events data is not an array:', events);
    }
  }, [events]);

  const renderEvent = (event: any) => {
    // Format eventDate if it's a Firestore Timestamp
    const formattedDate = event.eventDate instanceof firebase.firestore.Timestamp
      ? event.eventDate.toDate().toLocaleDateString()
      : 'Unknown';

    return (
      <View key={event.id} style={styles.eventItem}>
        <Text style={styles.eventName}>{event.eventName}</Text>
        <Text>Date: {formattedDate}</Text>
        {/* Render other event details */}
        {/* For example: <Text>Location: {event.eventLocation}</Text> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selected Events</Text>
      {selectedCategoryEvents.map(event => renderEvent(event))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  eventItem: {
    marginBottom: 16,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SelectedEventScreen;
