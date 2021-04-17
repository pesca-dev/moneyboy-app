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
    shadowRadius: 2,
    borderRadius: 20,
    shadowOffset: {
      height: -3,
      width: 0,
    },
    shadowOpacity: 0.1,
    justifyContent: 'center',
  },
});
