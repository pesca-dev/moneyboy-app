import { ListItem } from '@components/structure/ListItem';
import variables from '@config/variables';
import { StyleContext } from '@context/StyleContext';
import React, { useContext } from 'react';
import { GestureResponderEvent, StyleSheet, Text } from 'react-native';

export interface MoneyDiffProps {
  id: string;
  name: string;
  amount: number;
  last?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export const MoneyDiff: React.FC<MoneyDiffProps> = ({ name, amount, last, onPress }) => {
  const { Colors, Texts } = useContext(StyleContext);
  const styles = StyleSheet.create({
    moneyDiffName: {
      flex: 1,
      fontSize: variables.font.size.small,
      color: Texts.colors.primary,
    },
    moneyDiffAmount: {
      fontSize: variables.font.size.small,
    },
    positiveDiff: {
      color: Colors.status.success,
    },
    negativeDiff: {
      color: Colors.status.error,
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
