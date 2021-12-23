import { Container } from '@components/structure/Container';
import variables from '@config/variables';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type ViewBaseProps = {};

export function ViewBase({ children }: PropsWithChildren<ViewBaseProps>) {
  return (
    <Container>
      <View style={[styles.placeholder]} />
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    height: variables.display.placeholderTop.height,
  },
});
