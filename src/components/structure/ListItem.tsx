import Separator from '@components/structure/Separator';
import React, { Component, PropsWithChildren } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

interface ListItemProps {
  /**
   * Flag for indicating the last item in a list.
   * If this is false, a separator will be added.
   */
  last?: boolean;
  /**
   * Custom style for this list item.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom style for the separator.
   * note: It will be rendered outside of the style container of the ListItem.
   */
  separatorStyle?: StyleProp<ViewStyle>;

  onPress?: (event: GestureResponderEvent) => void;

  disabled?: boolean;
}

interface ListItemState {
  disabled: boolean;
}

/**
 * A simple wrapper for content to be displayed in a list.
 */
export default class ListItem extends Component<ListItemProps, ListItemState> {
  constructor(props: PropsWithChildren<ListItemProps>) {
    super(props);
    this.state = {
      disabled: !!this.props.disabled,
    };
  }

  /**
   * Disable all listeners on this list item.
   * @param disabled
   */
  setDisabled(disabled: boolean) {
    this.setState({
      ...this.state,
      disabled,
    });
  }

  render() {
    return (
      <>
        <TouchableWithoutFeedback onPress={this.props.onPress} disabled={this.state.disabled} testID="touchable">
          <View key={uuid()} style={[styles.listItem, this.props.style]} testID="view">
            {this.props.children}
          </View>
        </TouchableWithoutFeedback>
        {!this.props.last && <Separator style={this.props.separatorStyle} />}
      </>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
