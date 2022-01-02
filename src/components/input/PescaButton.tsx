import React, { PropsWithChildren } from 'react';
import { Insets, NativeSyntheticEvent, NativeTouchEvent, Pressable, StyleProp, ViewStyle } from 'react-native';

interface PescaButtonProps {
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  disabled?: boolean;
  /**
   * Custom style for the button.
   */
  style?: StyleProp<ViewStyle>;
  hitSlop?: Insets;
}

const defaultHitSlop: Insets = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

/**
 * Simple, clickable button.
 */
export const PescaButton: React.FC<PropsWithChildren<PescaButtonProps>> = ({
  disabled,
  style,
  onPress,
  children,
  hitSlop = defaultHitSlop,
}) => (
  <Pressable style={[style]} onPress={onPress} disabled={disabled} hitSlop={hitSlop} testID={'touchable'}>
    {children}
  </Pressable>
);
