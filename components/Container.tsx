import React, { PropsWithChildren } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

/**
 * Props for a container.
 */
interface ContainerProps {}

/**
 * A simple container for the react native application.
 * @param props properties for this container
 * @returns
 */
export default function Container(props: PropsWithChildren<ContainerProps>) {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
