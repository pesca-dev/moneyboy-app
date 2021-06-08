import React from 'react';
import { GestureResponderEvent, StyleSheet, Text } from 'react-native';

import variables from '@config/variables';
import ListItem from '@components/structure/ListItem';

export interface MoneyDiffProps {
  name: string;
  amount: number;
  last?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function MoneyDiff({ name, amount, last, onPress }: MoneyDiffProps) {
  return (
    <>
      <ListItem last={last} onPress={onPress}>
        <Text style={styles.moneyDiffName}>{name}</Text>
        <Text style={[styles.moneyDiffAmount, amount < 0 ? styles.negativeDiff : styles.positiveDiff]}>{amount} €</Text>
      </ListItem>
    </>
  );
}

const styles = StyleSheet.create({
  moneyDiffName: {
    flex: 1,
    fontSize: variables.font.size.small,
  },
  moneyDiffAmount: {
    fontSize: variables.font.size.small,
  },
  positiveDiff: {
    color: '#2ecc71',
  },
  negativeDiff: {
    color: '#e74c3c',
  },
});
