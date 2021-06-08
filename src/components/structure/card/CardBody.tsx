import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type CardBodyProps = {};

export default function CardBody({ children }: PropsWithChildren<CardBodyProps>) {
  return <View style={[styles.cardBody]}>{children}</View>;
}

const styles = StyleSheet.create({
  cardBody: {
    paddingHorizontal: 20,
  },
});
