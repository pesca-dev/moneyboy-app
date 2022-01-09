import React, { PropsWithChildren } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

/**
 * Props for a Container.
 */
type ContainerProps = unknown;

/**
 * A simple Container for the react native application.
 * @param props properties for this Container
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
