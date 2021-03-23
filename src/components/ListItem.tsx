/* eslint-disable no-void */
import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';
import Separator from '@components/Separator';

interface ListItemProps {
  last?: boolean;
  style?: StyleProp<ViewStyle>;
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
