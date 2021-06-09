import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface FooterProps {
  style?: StyleProp<ViewStyle>;
}

/**
 * Footer for a screen.
 */
export default function Footer({ children, style }: PropsWithChildren<FooterProps>) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: '#fff',
    shadowColor: '#42423d',
    borderRadius: 20,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    justifyContent: 'center',
  },
});
