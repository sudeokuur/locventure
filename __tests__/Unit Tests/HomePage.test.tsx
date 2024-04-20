import { render } from '@testing-library/react-native';
import React from 'react';
import HomePage from '../../src/screens/HomePage';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock auth and firebase modules
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('<HomePage />', () => {
  it('renders welcome message', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('Welcome, !')).toBeTruthy();
  });

  it('renders events for location', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('Events for your location: ')).toBeTruthy();
  });

  it('renders upcoming events section', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('Upcoming Events')).toBeTruthy();
  });

  it('renders past events section', () => {
    const { getByText } = render(<HomePage />);
    expect(getByText('Past Events')).toBeTruthy();
  });

  it('renders logout button', () => {
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId('logout-button')).toBeTruthy();
  });

});
