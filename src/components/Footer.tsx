import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

interface FooterProps {}

/**
 * Footer for a screen.
 */
export default function Footer({ children }: PropsWithChildren<FooterProps>) {
  return <View style={styles.footer}>{children}</View>;
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
