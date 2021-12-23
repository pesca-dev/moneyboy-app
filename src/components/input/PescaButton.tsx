import variables from '@config/variables';
import { ThemeContext } from '@context/ThemeContext';
import React, { PropsWithChildren, useState } from 'react';
import {
  Insets,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

interface PescaButtonProps {
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  disabled?: boolean;
  /**
   * Custom style for the button.
   */
  style?: StyleProp<ViewStyle>;
  hitSlop?: Insets;
}

interface PescaButtonState {
  disabled: boolean;
}

const defaultHitSlop: Insets = {
  top: 40,
  right: 40,
  bottom: 40,
  left: 40,
};

/**
 * Simple, clickable button.
 */
export function PescaButton({
  disabled,
  style,
  onPress,
  children,
  hitSlop = defaultHitSlop,
}: PropsWithChildren<PescaButtonProps>) {
  const [state] = useState<PescaButtonState>({
    disabled: !!disabled,
  });

  const theme = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      margin: 'auto',
      backgroundColor: theme.buttons.default.background,
      padding: 10,
      borderRadius: 10,
    },
    content: {
      fontSize: variables.font.size.small,
      color: theme.buttons.default.color,
    },
  });

  return (
    <TouchableWithoutFeedback
      style={[styles.container, style]}
      onPress={onPress}
      disabled={state.disabled}
      hitSlop={hitSlop}
      testID="touchable">
      {children}
    </TouchableWithoutFeedback>
  );
}
