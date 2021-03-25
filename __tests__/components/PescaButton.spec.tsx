import 'react-native';
import React from 'react';
import PescaButton from '@components/PescaButton';
import { cleanup, fireEvent, render } from '@testing-library/react-native';

describe('PescaButton', () => {
  afterEach(cleanup);

  it('shall display the given text', () => {
    const title = 'My Title';
    const item = render(<PescaButton title={title} />);
    expect(item.getByTestId('text').props.children).toBe(title);
  });

  it('shall call onPress function when clicked', () => {
    const title = 'My Title';
    const onPress = jest.fn();
    const item = render(<PescaButton title={title} onPress={onPress} />);

    fireEvent.press(item.getByTestId('touchable'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shall respect disabled as prop', () => {
    const title = 'My Title';
    const onPress = jest.fn();
    const item = render(<PescaButton title={title} onPress={onPress} disabled />);

    fireEvent.press(item.getByTestId('touchable'));
    expect(onPress).toHaveBeenCalledTimes(0);
  });
});
