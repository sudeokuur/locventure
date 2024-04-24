import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RateEventScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const submitRating = () => {
    // Here you can implement logic to submit the rating and comment to your database
    console.log('Rating:', rating);
    console.log('Comment:', comment);
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
              onPress={() => handleRatingChange(value)}
            />
          ))}
        </View>
      </View>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={comment}
        onChangeText={handleCommentChange}
      />
      <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default RateEventScreen;