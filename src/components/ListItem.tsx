/* eslint-disable no-void */
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';
import Separator from '@components/Separator';

interface ListItemProps {
  last?: boolean;
}

export default function ListItem({
  last,
  children,
}: PropsWithChildren<ListItemProps>) {
  return (
    <>
      <View key={uuid()} style={styles.listItem}>
        {children}
      </View>
      {(() => (last ? void 0 : <Separator />))()}
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
