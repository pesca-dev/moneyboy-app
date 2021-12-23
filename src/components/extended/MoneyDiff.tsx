import { ListItem } from '@components/structure/ListItem';
import variables from '@config/variables';
import { ThemeContext } from '@context/ThemeContext';
import React from 'react';
import { GestureResponderEvent, StyleSheet, Text } from 'react-native';

export interface MoneyDiffProps {
  id: string;
  name: string;
  amount: number;
  last?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const MoneyDiff: React.FC<MoneyDiffProps> = ({ name, amount, last, onPress }) => {
  const theme = React.useContext(ThemeContext);
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
};
