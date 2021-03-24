/* eslint-disable no-void */
import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';
import Separator from '@components/Separator';

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
}

/**
 * A simple wrapper for content to be displayed in a list.
 */
export default function ListItem({
  last,
  style,
  separatorStyle,
  children,
}: PropsWithChildren<ListItemProps>) {
  return (
    <>
      <View key={uuid()} style={[styles.listItem, style]}>
        {children}
      </View>
      {(() => (last ? void 0 : <Separator style={separatorStyle} />))()}
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
