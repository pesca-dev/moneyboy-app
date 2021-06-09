import React, { PropsWithChildren, useState } from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

import variables from '@config/variables';
import { ThemeContext } from '@context/ThemeContext';

interface PescaButtonProps {
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  disabled?: boolean;
  /**
   * Custom style for the button.
   */
  style?: StyleProp<ViewStyle>;
}

interface PescaButtonState {
  disabled: boolean;
}

/**
 * Simple, clickable button.
 */
export default function PescaButton(props: PropsWithChildren<PescaButtonProps>) {
  const [state] = useState<PescaButtonState>({
    disabled: !!props.disabled,
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
      style={[styles.container, props.style]}
      onPress={props.onPress}
      disabled={state.disabled}
      hitSlop={{
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
      }}
      testID="touchable">
      {props.children}
    </TouchableWithoutFeedback>
  );
}
