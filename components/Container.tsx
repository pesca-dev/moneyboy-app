import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

/**
 * Props for a container.
 */
interface ContainerProps {}

/**
 * A simple container for the react native application.
 * @param props properties for this container
 * @returns
 */
const Container: React.FC<ContainerProps> = (props) => {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default Container;
