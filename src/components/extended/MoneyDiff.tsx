import React from 'react';
import { GestureResponderEvent, StyleSheet, Text } from 'react-native';

import variables from '@config/variables';
import ListItem from '@components/structure/ListItem';
import { StyleContext } from '@context/StyleContext';

export interface MoneyDiffProps {
  name: string;
  amount: number;
  last?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function MoneyDiff({ name, amount, last, onPress }: MoneyDiffProps) {
  const theme = React.useContext(StyleContext);
  const styles = StyleSheet.create({
    moneyDiffName: {
      flex: 1,
      fontSize: variables.font.size.small,
      color: theme.content.text.color,
    },
    moneyDiffAmount: {
      fontSize: variables.font.size.small,
    },
    positiveDiff: {
      color: theme.signals.success,
    },
    negativeDiff: {
      color: theme.signals.error,
    },
  });

  return (
    <>
      <ListItem last={last} onPress={onPress}>
        <Text style={styles.moneyDiffName}>{name}</Text>
        <Text style={[styles.moneyDiffAmount, amount < 0 ? styles.negativeDiff : styles.positiveDiff]}>{amount} €</Text>
      </ListItem>
    </>
  );
}
