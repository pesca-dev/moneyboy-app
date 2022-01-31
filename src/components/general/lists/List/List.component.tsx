import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useListStyles } from './List.style';

interface ListProps<T> {
  /**
   * Data, that shall be rendered in the List.
   */
  data: T;
  /**
   * Custom style for this List-Container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Renderer for the data. It excepts one argument of type T (the type of the data) and returns a ReactNode.
   * @param data data to be rendered
   */
  render?(data: T): React.ReactNode;
}

/**
 * A simple display utility for displaying a List.
 */
export function List<T>({ style, render, data }: ListProps<T>) {
  // Use a very simple render function if none is provided
  const renderFn = render ?? ((renderData: T) => <View>{renderData}</View>);
  const styles = useListStyles();
  return <View style={[styles.itemContainer, style]}>{renderFn(data)}</View>;
}
