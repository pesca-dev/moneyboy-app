import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface PescaButtonProps {
  title: string;
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  disabled?: boolean;
  /**
   * Custom style for the button.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom style for the text.
   */
  textStyle?: StyleProp<ViewStyle>;
}

interface PescaButtonState {
  title: string;
  disabled: boolean;
}

/**
 * Simple, clickable button.
 */
export default function PescaButton(props: PescaButtonProps) {
  const [state] = useState<PescaButtonState>({
    title: props.title,
    disabled: !!props.disabled,
  });

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onPress}
      disabled={state.disabled}
      activeOpacity={0.5}
      testID="touchable">
      <Text style={[styles.content, props.textStyle]} testID="text">
        {state.title}
      </Text>
    </TouchableOpacity>
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
