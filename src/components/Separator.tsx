import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

interface SeparatorProps {
  /**
   * Custom styling for the separator.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Separator for a list.
 */
export default function Separator({ style }: SeparatorProps) {
  return (
    <View key={uuid()} style={styles.separatorContainer}>
      <View style={[styles.separator, style]} />
    </View>
  );
}

const styles = StyleSheet.create({
  separatorContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  separator: {
    flex: 1,
    height: 1,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#ecf0f1',
  },
});
