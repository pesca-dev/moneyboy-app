import { useStyle } from '@moneyboy/hooks/useStyle';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

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
  const { Content } = useStyle();
  const styles = StyleSheet.create({
    separatorContainer: {
      width: '100%',
      flexDirection: 'row',
    },
    separator: {
      flex: 1,
      height: 1,
      marginHorizontal: 15,
      backgroundColor: Content.separator.color,
    },
  });

  return (
    <View style={styles.separatorContainer}>
      <View style={[styles.separator, style]} />
    </View>
  );
};
