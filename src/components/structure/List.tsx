import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface ListProps<T> {
  /**
   * Data, that shall be rendered in the list.
   */
  data: T;
  /**
   * Renderer for the data. It excepts one argument of type T (the type of the data) and returns a ReactNode.
   * @param data data to be rendered
   */
  render?(data: T): React.ReactNode;
  /**
   * Custom style for this list-container.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * A simple display utility for displaying a list.
 */
export function List<T>({ style, render, data }: ListProps<T>) {
  // Use a very simple render function if none is provided
  const renderFn =
    render ??
    ((renderData: T) => {
      return <View>{renderData}</View>;
    });

  return <View style={[styles.itemContainer, style]}>{renderFn(data)}</View>;
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
  },
});
