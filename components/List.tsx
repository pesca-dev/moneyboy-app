import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ListProps<T> {
  data: T;
  render?(data: T): React.ReactNode;
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

  return <View style={styles.itemContainer}>{render(props.data)}</View>;
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
  },
});

export default List;
