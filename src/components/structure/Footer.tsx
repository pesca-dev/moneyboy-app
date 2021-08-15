import { ThemeContext } from '@context/ThemeContext';
import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface FooterProps {
  style?: StyleProp<ViewStyle>;
}

/**
 * Footer for a screen.
 */
export default function Footer({ children, style }: PropsWithChildren<FooterProps>) {
  const theme = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    footerWrapper: {
      backgroundColor: theme.content.background,
      marginHorizontal: 20,
    },
    footer: {
      height: 60,
      backgroundColor: theme.footer.background,
      shadowColor: theme.footer.shadow,
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
  return (
    <View style={[styles.footerWrapper]}>
      <View style={[styles.footer, style]}>{children}</View>
    </View>
  );
}
