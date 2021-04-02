import React from 'react';
import { GestureResponderEvent, StyleSheet, Text } from 'react-native';
import ListItem from './ListItem';

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
    fontSize: 24,
  },
  moneyDiffAmount: {
    fontSize: 24,
  },
  positiveDiff: {
    color: '#2ecc71',
  },
  negativeDiff: {
    color: '#e74c3c',
  },
});
