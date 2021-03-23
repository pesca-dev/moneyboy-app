/* eslint-disable no-void */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import ListItem from './ListItem';
import Separator from './Separator';

export interface MoneyDiffProps {
  name: string;
  amount: number;
  last?: boolean;
}

export default function MoneyDiff({ name, amount, last }: MoneyDiffProps) {
  return (
    <>
      <ListItem last={last}>
        <Text style={styles.moneyDiffName}>{name}</Text>
        <Text
          style={[
            styles.moneyDiffAmount,
            amount < 0 ? styles.negativeDiff : styles.positiveDiff,
          ]}>
          {amount} €
        </Text>
      </ListItem>
      {(() => (last ? void 0 : <Separator />))()}
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
