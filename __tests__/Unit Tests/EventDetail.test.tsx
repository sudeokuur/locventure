import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import EventDetail from '../../src/components/EventDetail';
// Mock useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

// Mock firestore module
jest.mock('@react-native-firebase/firestore', () => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn().mockResolvedValue({
        data: () => ({
          eventName: 'Test Event',
          eventDate: '2022-04-25',
          eventCity: 'Test City',
          eventType: 'Test Type',
          eventDescription: 'Test Description',
        }),
        exists: true,
      }),
    })),
  })),
}));

describe('<EventDetail />', () => {
 

  it('renders loading message when event details are being fetched', async () => {
    const route = {
      params: {
        eventId: 'event_id_123',
      },
    };

    const { getByText } = render(<EventDetail route={route} />);

    await waitFor(() => {
      expect(getByText('Loading event details...')).toBeTruthy();
    });
  });


});
