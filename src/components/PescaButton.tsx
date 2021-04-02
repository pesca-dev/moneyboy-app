import React, { PropsWithChildren, useState } from 'react';
import {
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

  return (
    <TouchableWithoutFeedback
      style={[styles.container, props.style]}
      onPress={props.onPress}
      disabled={state.disabled}
      testID="touchable">
      {props.children}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 100,
    margin: 'auto',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
  },
  content: {
    fontSize: 20,
    color: '#fff',
  },
});
