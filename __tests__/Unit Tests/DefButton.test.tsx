import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import DefButton from '../../src/components/DefButton';
describe('<DefButton />', () => {
  it('renders button with correct title', () => {
    const title = 'Test Button';
    const { getByText } = render(<DefButton title={title} onPress={() => {}} />);
    expect(getByText(title)).toBeTruthy();
  });

  it('calls onPress function when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<DefButton title="Test Button" onPress={onPressMock} />);
    const button = getByText('Test Button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
