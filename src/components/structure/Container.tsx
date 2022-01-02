import React, { PropsWithChildren } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

/**
 * Props for a container.
 */
type ContainerProps = unknown;

/**
 * A simple container for the react native application.
 * @param props properties for this container
 * @returns
 */
export const Container: React.FC<PropsWithChildren<ContainerProps>> = props => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
  });

  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};
