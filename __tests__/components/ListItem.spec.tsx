import 'react-native';
import React from 'react';
import ListItem from '@components/ListItem';
import { mock } from 'jest-mock-extended';

import { create } from 'react-test-renderer';
import { GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';

describe('ListItem', () => {
  it('shall render correctly', () => {
    create(<ListItem />);
  });

  it('shall not be disabled by default', () => {
    const item = create(<ListItem />);
    const instance = (item.getInstance() as unknown) as ListItem;
    const touchable = item.root.findByType(TouchableWithoutFeedback).instance as TouchableWithoutFeedback;

    expect(instance.state.disabled).toBe(false);
    expect(touchable.props.disabled).toBe(false);
  });

  it('shall use press listeners', () => {
    const onPress = jest.fn();
    const onLongPress = jest.fn();

    const item = create(<ListItem onPress={onPress} onLongPress={onLongPress} />);
    const touchable = item.root.findByType(TouchableWithoutFeedback).instance as TouchableWithoutFeedback;

    const mocked = mock<GestureResponderEvent>();

    touchable.props.onPress?.(mocked);
    expect(onPress).toHaveBeenCalledTimes(1);

    touchable.props.onLongPress?.(mocked);
    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it('shall pass disabled as prop', () => {
    const item = create(<ListItem disabled />);
    const touchable = item.root.findByType(TouchableWithoutFeedback).instance as TouchableWithoutFeedback;

    expect(touchable.props.disabled).toBe(true);
  });

  it('shall store disabled in state', () => {
    const item = create(<ListItem disabled />);
    const instance = (item.getInstance() as unknown) as ListItem;
    expect(instance.state.disabled).toBe(true);
  });

  it('shall forward disabled state changes', () => {
    const item = create(<ListItem />);
    const instance = (item.getInstance() as unknown) as ListItem;
    const touchable = item.root.findByType(TouchableWithoutFeedback).instance as TouchableWithoutFeedback;

    instance.setState({
      ...instance.state,
      disabled: true,
    });
    expect(touchable.props.disabled).toBe(true);

    instance.setState({
      ...instance.state,
      disabled: false,
    });
    expect(touchable.props.disabled).toBe(false);
  });

  it('shall change disabled state when calling setDisabled', () => {
    const item = create(<ListItem />);
    const instance = (item.getInstance() as unknown) as ListItem;

    instance.setDisabled(true);
    expect(instance.state.disabled).toBe(true);

    instance.setDisabled(false);
    expect(instance.state.disabled).toBe(false);
  });
});
