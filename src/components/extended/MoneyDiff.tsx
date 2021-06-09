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
    color: variables.themes.light.text.default,
  },
  moneyDiffAmount: {
    fontSize: variables.font.size.small,
  },
  positiveDiff: {
    color: variables.themes.light.signals.good,
  },
  negativeDiff: {
    color: variables.themes.light.signals.bad,
  },
});
