import { StyleContext } from '@context/StyleContext';
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
  const theme = React.useContext(StyleContext);
  const styles = StyleSheet.create({
    separatorContainer: {
      width: '100%',
      flexDirection: 'row',
    },
    separator: {
      flex: 1,
      height: 1,
      marginHorizontal: 15,
      backgroundColor: theme.content.separator.color,
    },
  });

  return (
    <View key={uuid()} style={styles.separatorContainer}>
      <View style={[styles.separator, style]} />
    </View>
  );
}
