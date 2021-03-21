import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

interface CardProps {}

/**
 *  Container for displaying content with rounded corners and an elevation effect.
 */
export default function Card({ children }: PropsWithChildren<CardProps>) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#42423d',
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
});
