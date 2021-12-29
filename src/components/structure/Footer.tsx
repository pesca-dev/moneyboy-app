import { StyleContext } from '@context/StyleContext';
import { ThemeContext } from '@context/ThemeContext';
import React, { PropsWithChildren, useContext } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface FooterProps {
  style?: StyleProp<ViewStyle>;
}

/**
 * Footer for a screen.
 */
export const Footer: React.FC<PropsWithChildren<FooterProps>> = ({ children, style }) => {
  const theme = React.useContext(ThemeContext);
  const { Content } = useContext(StyleContext);
  const styles = StyleSheet.create({
    footerWrapper: {
      backgroundColor: Content.background,
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
};
