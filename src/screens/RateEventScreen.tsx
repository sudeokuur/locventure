import React, { useState } from 'react'; // Import React and useState hook
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Import necessary components from react-native

// Functional component definition for RateEventScreen
const RateEventScreen = ({ route, navigation }) => {
  const { eventId } = route.params; // Extract eventId from route params
  const [rating, setRating] = useState(0); // State variable for rating, initialized to 0
  const [comment, setComment] = useState(''); // State variable for comment, initialized to empty string

  // Function to handle rating change
  const handleRatingChange = (value) => {
    setRating(value); // Update rating state with the selected value
  };

  // Function to handle comment change
  const handleCommentChange = (text) => {
    setComment(text); // Update comment state with the entered text
  };

  // Function to submit rating and comment
  const submitRating = () => {
    // Logic to submit the rating and comment to the database
    console.log('Rating:', rating); // Log the rating
    console.log('Comment:', comment); // Log the comment
    // After submitting, navigate back to the event detail screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Event</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating:</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              style={[styles.star, value <= rating ? styles.starSelected : null]}
              onPress={() => handleRatingChange(value)} // Call handleRatingChange with the selected value onPress
            />
          ))}
        </View>
      </View>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={comment}
        onChangeText={handleCommentChange} // Call handleCommentChange onChangeText
      />
      <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for RateEventScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  ratingContainer: {
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    fontSize: 24,
    color: 'white',
    marginRight: 8,
  },
  starSelected: {
    color: 'gold',
  },
  commentInput: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RateEventScreen; // Export RateEventScreen component as default
