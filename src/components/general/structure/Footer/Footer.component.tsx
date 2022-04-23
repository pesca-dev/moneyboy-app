import React, { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useFooterStyles } from './Footer.style';

interface FooterProps {
  style?: StyleProp<ViewStyle>;
}

/**
 * Footer for a screen.
 *
 * @deprecated
 */
export const Footer: React.FC<PropsWithChildren<FooterProps>> = ({ children, style }) => {
  const styles = useFooterStyles();
  return (
    <View style={[styles.footerWrapper]}>
      <View style={[styles.footer, style]}>{children}</View>
    </View>
  );
};
