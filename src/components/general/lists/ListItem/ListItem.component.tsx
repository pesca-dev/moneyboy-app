import { Separator } from '@moneyboy/components/general/lists/Separator';
import React, { PropsWithChildren } from 'react';
import { GestureResponderEvent, StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useListItemStyles } from './ListItem.style';

interface ListItemProps {
  /**
   * Flag for indicating the last item in a List.
   * If this is false, a Separator will be added.
   */
  last?: boolean;
  /**
   * Custom style for this List item.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom style for the Separator.
   * note: It will be rendered outside of the style Container of the ListItem.
   */
  separatorStyle?: StyleProp<ViewStyle>;

  onPress?: (event: GestureResponderEvent) => void;

  disabled?: boolean;
}

/**
 * A simple wrapper for Content to be displayed in a List.
 */

export const ListItem: React.FC<PropsWithChildren<ListItemProps>> = ({
  disabled,
  onPress,
  children,
  last,
  style,
  separatorStyle,
}) => {
  const styles = useListItemStyles();
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress} disabled={disabled} testID="touchable">
        <View style={[styles.listItem, style]} testID="view">
          {children}
        </View>
      </TouchableWithoutFeedback>
      {!last && <Separator style={separatorStyle} />}
    </>
  );
};
