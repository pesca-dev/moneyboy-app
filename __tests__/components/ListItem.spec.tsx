import 'react-native';
import React from 'react';
import ListItem from '@components/ListItem';

import { cleanup, fireEvent, render } from '@testing-library/react-native';
import { TouchableWithoutFeedback } from 'react-native';

describe('ListItem', () => {
  afterEach(cleanup);

  it('shall render correctly', () => {
    render(<ListItem />);
  });

  it('shall not be disabled by default', () => {
    const item = render(<ListItem />);
    const instance = item.container.instance as ListItem;
    const touchable = (item.getByTestId('touchable') as unknown) as TouchableWithoutFeedback;

    expect(instance.state.disabled).toBeFalsy();
    expect(touchable.props.disabled).toBeFalsy();
  });

  it('shall use press listener', () => {
    const onPress = jest.fn();
    const item = render(<ListItem onPress={onPress} />);
    fireEvent.press(item.container);

    expect(onPress).toBeCalledTimes(1);
  });

  it('shall respect disabled as prop', () => {
    const onPress = jest.fn();
    const item = render(<ListItem onPress={onPress} disabled />);
    const touchable = item.getByTestId('touchable');

    fireEvent.press(touchable);

    expect(onPress).toBeCalledTimes(0);
  });

  it('shall change disabled stated when calling setDisabled', () => {
    const onPress = jest.fn();
    const item = render(<ListItem onPress={onPress} />);
    const instance = item.container.instance as ListItem;

    instance.setDisabled(true);
    fireEvent.press(item.getByTestId('touchable'));
    expect(onPress).toHaveBeenCalledTimes(0);

    instance.setDisabled(false);
    fireEvent.press(item.getByTestId('touchable'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
