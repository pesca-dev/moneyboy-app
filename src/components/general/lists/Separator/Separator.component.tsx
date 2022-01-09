import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSeparatorStyles } from './Separator.style';

interface SeparatorProps {
  /**
   * Custom styling for the Separator.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Separator for a List.
 */
export const Separator: React.FC<SeparatorProps> = ({ style }) => {
  const styles = useSeparatorStyles();
  return (
    <View style={styles.separatorContainer}>
      <View style={[styles.separator, style]} />
    </View>
  );
};
