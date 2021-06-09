import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type CardcontainerProps = {};

export default function CardContainer({ children }: PropsWithChildren<CardcontainerProps>) {
  return <View style={[styles.cardConainer]}>{children}</View>;
}

const styles = StyleSheet.create({
  cardConainer: {
    width: '100%',
    elevation: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#42423d',
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
});
