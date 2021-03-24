import React, { Component } from 'react';
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
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
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
export default class PescaButton extends Component<PescaButtonProps, PescaButtonState> {
  constructor(props: PescaButtonProps) {
    super(props);

    this.state = {
      title: this.props.title,
      disabled: !!this.props.disabled,
    };
  }

  public setDisabled(disabled: boolean): void {
    this.setState({
      ...this.state,
      disabled,
    });
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
        disabled={this.state.disabled}
        activeOpacity={0.5}>
        <Text style={[styles.content, this.props.textStyle]}>{this.state.title}</Text>
      </TouchableOpacity>
    );
  }
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
