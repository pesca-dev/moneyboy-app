import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface ListProps<T> {
  data: T;
  render?(data: T): React.ReactNode;
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
