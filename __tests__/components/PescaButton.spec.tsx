import { PescaButton } from '@components/input/PescaButton';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

describe('PescaButton', () => {
  afterEach(cleanup);

  // TODO lome: Investigate, if this can be tested
  // it('shall display the given text', () => {
  //   const title = 'My Title';
  //   const item = render(
  //     <PescaButton>
  //       <Text testID="test">{title}</Text>
  //     </PescaButton>,
  //   );
  //   expect(item.getByTestId('test').props.children).toBe(title);
  // });

  it('shall call onPress function when clicked', () => {
    const title = 'My Title';
    const onPress = jest.fn();
    const item = render(
      <PescaButton onPress={onPress}>
        <Text>{title}</Text>
      </PescaButton>,
    );

    fireEvent.press(item.getByTestId('touchable'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shall respect disabled as prop', () => {
    const title = 'My Title';
    const onPress = jest.fn();
    const item = render(
      <PescaButton onPress={onPress} disabled>
        <Text>{title}</Text>
      </PescaButton>,
    );

    fireEvent.press(item.getByTestId('touchable'));
    expect(onPress).toHaveBeenCalledTimes(0);
  });
});
