import { render } from '@testing-library/react-native';
import React from 'react';
import LetsGetStarted from '../../src/screens/LetsGetStarted';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('<LetsGetStarted />', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(<LetsGetStarted />);
    expect(getByText('LocaleVenture')).toBeTruthy();
  });

  it('renders the description correctly', () => {
    const { getByText } = render(<LetsGetStarted />);
    expect(getByText('Discover local events, plan outings, and stay connected. Let\'s get started!')).toBeTruthy();
  });

  it('renders the "Sign Up" button correctly', () => {
    const { getByText } = render(<LetsGetStarted />);
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('renders the "Sign In" button correctly', () => {
    const { getByText } = render(<LetsGetStarted />);
    expect(getByText('Sign In')).toBeTruthy();
  });

});
