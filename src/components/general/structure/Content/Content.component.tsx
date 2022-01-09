import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useContentStyles } from './Content.style';

type ContentProps = unknown;

/**
 * Container around the Content. It adds some default padding left and right.
 */
export const Content: React.FC<PropsWithChildren<ContentProps>> = ({ children }) => {
  const styles = useContentStyles();

  return <View style={styles.content}>{children}</View>;
};
