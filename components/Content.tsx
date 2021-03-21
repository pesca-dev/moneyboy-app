import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

interface ContentProps {}

/**
 * Container around the content. It adds some default padding left and right.
 */
export default function Content({ children }: PropsWithChildren<ContentProps>) {
  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
