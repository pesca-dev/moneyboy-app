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
function List<T>(props: ListProps<T>) {
  // Use a very simple render function if none is provided
  const render =
    props.render ??
    ((data: T) => {
      return <View>{data}</View>;
    });

  return (
    <View style={[styles.itemContainer, props.style]}>
      {render(props.data)}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
  },
});

export default List;
