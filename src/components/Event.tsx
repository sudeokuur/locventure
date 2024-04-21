import { useNavigation } from '@react-navigation/native'; // Importing useNavigation hook from react-navigation/native
import React from 'react'; // Importing React library
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Importing necessary components from react-native

interface EventProps {
  event: {
    id: string;
    eventName: string;
    eventDate: string;
    eventCity: string;
    eventDescription: string;
    eventImage: string; // Assuming eventImage is a URL to the image
    eventType: string;
  };
}

// Functional component definition for Event
const Event: React.FC<EventProps> = ({ event }) => {
  const navigation = useNavigation(); // Initializing navigation hook

  // Function to handle press on the event
  const handleEventPress = () => {
    navigation.navigate('EventDetail', { event: event }); // Navigating to EventDetail screen with event details
  };

  return (
    <TouchableOpacity onPress={handleEventPress}> {/* TouchableOpacity for touchable feedback */}
      <View style={styles.eventContainer}> {/* Container for event */}
        <ImageBackground
          source={{ uri: event.eventImage }} // Setting background image from eventImage URL
          style={styles.background} // Styling for background image
          imageStyle={{ borderRadius: 8 }} // Styling for the background image itself
        >
          <View style={styles.container}> {/* Container for event details */}
            <Text style={styles.title}>{event.eventName}</Text> {/* Event name */}
            <Text style={styles.details}>Date: {event.eventDate}</Text> {/* Event date */}
            <Text style={styles.details}>Location: {event.eventCity}</Text> {/* Event location */}
            <Text style={styles.details}>Category: {event.eventType}</Text> {/* Event category */}
            <Text style={styles.details}>Description: {event.eventDescription}</Text> {/* Event description */}
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

// Styles for Event component
const styles = StyleSheet.create({
  eventContainer: {
    width: '100%', // Full width
    height: 200, // Set a fixed height for the Event component
    marginBottom: 16, // Margin bottom for spacing between events
  },
  container: {
    padding: 16, // Padding for event details
  },
  background: {
    flex: 1, // Take up all available space
    borderRadius: 8, // Border radius for the background image
    overflow: 'hidden', // Hide overflow content
    resizeMode: 'cover', // Cover mode for image resizing
    borderWidth: 1, // Border width
    borderColor: '#262323', // Border color
    backgroundColor: 'transparent', // Set background color to transparent
  },
  title: {
    fontSize: 18, // Font size for event title
    fontWeight: 'bold', // Bold font weight
    marginBottom: 8, // Margin bottom for spacing
    color: 'white', // Assuming white text for visibility
  },
  details: {
    fontSize: 16, // Font size for event details
    color: 'white', // Assuming white text for visibility
  },
});

export default Event; // Exporting Event component as default
