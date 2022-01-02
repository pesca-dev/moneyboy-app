import { Container } from '@components/structure/Container';
import variables from '@config/variables';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type ViewBaseProps = unknown;

export const ViewBase: React.FC<PropsWithChildren<ViewBaseProps>> = ({ children }) => {
  const styles = StyleSheet.create({
    placeholder: {
      height: variables.display.placeholderTop.height,
    },
  });

  return (
    <Container>
      <View style={[styles.placeholder]} />
      {children}
    </Container>
  );
};
