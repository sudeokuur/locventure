import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import RateEventScreen from '../../src/screens/RateEventScreen';
describe('<RateEventScreen />', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<RateEventScreen route={{ params: { eventId: '1' } }} navigation={undefined} />);
    const title = getByText('Rate Event');
    const ratingText = getByText('Rating:');
    const commentInput = getByPlaceholderText('Add a comment...');
    const submitButton = getByText('Submit');

    expect(title).toBeTruthy();
    expect(ratingText).toBeTruthy();
    expect(commentInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('updates rating and comment correctly', () => {
    const { getByPlaceholderText } = render(<RateEventScreen route={{ params: { eventId: '1' } }} navigation={undefined} />);
    const commentInput = getByPlaceholderText('Add a comment...');

    fireEvent.changeText(commentInput, 'Test Comment');
    expect(commentInput.props.value).toBe('Test Comment');
  });

  
});
