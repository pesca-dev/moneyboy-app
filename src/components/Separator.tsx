import React from 'react';
import { StyleSheet, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

/**
 * Separator for a list.
 */
export default function Separator() {
  return (
    <View key={uuid()} style={styles.separatorContainer}>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  separatorContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ecf0f1',
  },
});
