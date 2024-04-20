import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import SearchScreen from '../../src/screens/SearchScreen';
// Mock firestore
jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('<SearchScreen />', () => {
  it('renders search input correctly', () => {
    const { getByPlaceholderText } = render(<SearchScreen />);
    expect(getByPlaceholderText('Search for an event...')).toBeTruthy();
  });

  it('renders search button correctly', () => {
    const { getByText } = render(<SearchScreen />);
    expect(getByText('Search')).toBeTruthy();
  });

  it('updates search text correctly', () => {
    const { getByPlaceholderText } = render(<SearchScreen />);
    const searchInput = getByPlaceholderText('Search for an event...');
    fireEvent.changeText(searchInput, 'Test Event');
    expect(searchInput.props.value).toBe('Test Event');
  });

});
