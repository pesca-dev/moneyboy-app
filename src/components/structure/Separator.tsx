import { StyleContext } from '@moneyboy/context/StyleContext';
import React, { useContext } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface SeparatorProps {
  /**
   * Custom styling for the separator.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Separator for a list.
 */
export const Separator: React.FC<SeparatorProps> = ({ style }) => {
  const { Content } = useContext(StyleContext);
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
