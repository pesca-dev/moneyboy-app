import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type ContentProps = unknown;

/**
 * Container around the content. It adds some default padding left and right.
 */
export const Content: React.FC<PropsWithChildren<ContentProps>> = ({ children }) => {
  const styles = StyleSheet.create({
    content: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
  });

  return <View style={styles.content}>{children}</View>;
};
