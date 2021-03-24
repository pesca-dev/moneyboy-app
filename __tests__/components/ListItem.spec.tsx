import 'react-native';
import React from 'react';
import ListItem from '@components/ListItem';
import { mock } from 'jest-mock-extended';

import { create } from 'react-test-renderer';
import { GestureResponderEvent } from 'react-native';

describe('ListItem', () => {
  it('shall render correctly', () => {
    create(<ListItem />);
  });

  it('shall not be disabled by default', () => {
    const item = (create(<ListItem />).getInstance() as unknown) as ListItem;
    expect(item.state.disabled).toBe(false);
  });

  it('shall use press listeners', () => {
    const onPress = jest.fn();
    const onLongPress = jest.fn();

    const item = (create(
      <ListItem onPress={onPress} onLongPress={onLongPress} />,
    ).getInstance() as unknown) as ListItem;

    const mocked = mock<GestureResponderEvent>();

    item.onPress(mocked);
    expect(onPress).toHaveBeenCalledTimes(1);

    item.onLongPress(mocked);
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it('shall respect disabled as prop', () => {
    const onPress = jest.fn();
    const onLongPress = jest.fn();

    const item = (create(
      <ListItem onPress={onPress} onLongPress={onLongPress} disabled />,
    ).getInstance() as unknown) as ListItem;

    const mocked = mock<GestureResponderEvent>();

    item.onPress(mocked);
    expect(onPress).toHaveBeenCalledTimes(0);

    item.onLongPress(mocked);
    expect(onLongPress).toHaveBeenCalledTimes(0);
  });

  it('shall respect disabled state call', () => {
    const onPress = jest.fn();
    const onLongPress = jest.fn();

    const item = (create(
      <ListItem onPress={onPress} onLongPress={onLongPress} />,
    ).getInstance() as unknown) as ListItem;

    item.setState({
      ...item.state,
      disabled: true,
    });

    const mocked = mock<GestureResponderEvent>();

    item.onPress(mocked);
    expect(onPress).toHaveBeenCalledTimes(0);

    item.onLongPress(mocked);
    expect(onLongPress).toHaveBeenCalledTimes(0);

    item.setState({
      ...item.state,
      disabled: false,
    });

    item.onPress(mocked);
    expect(onPress).toHaveBeenCalledTimes(1);

    item.onLongPress(mocked);
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it('state shall change when calling setDisabled', () => {
    const item = (create(<ListItem />).getInstance() as unknown) as ListItem;

    item.setDisabled(true);
    expect(item.state.disabled).toBe(true);

    item.setDisabled(false);
    expect(item.state.disabled).toBe(false);
  });
});
