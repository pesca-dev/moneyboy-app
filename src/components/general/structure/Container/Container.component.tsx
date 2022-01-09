import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native';
import { useContainerStyles } from './Container.style';

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
  const styles = useContainerStyles();

  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};
