import variables from '@config/variables';
import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface FooterProps {
  style?: StyleProp<ViewStyle>;
}

/**
 * Footer for a screen.
 */
export default function Footer({ children, style }: PropsWithChildren<FooterProps>) {
  return (
    <View style={[styles.footerWrapper]}>
      <View style={[styles.footer, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: variables.themes.light.background.primary,
  },
  footer: {
    height: 60,
    backgroundColor: variables.themes.light.background.primary,
    shadowColor: variables.themes.light.shadow.primary,
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
