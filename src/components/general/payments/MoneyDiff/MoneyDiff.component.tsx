import { Number } from '@moneyboy/components/general/display/Number';
import { ListItem } from '@moneyboy/components/general/lists/ListItem';
import React from 'react';
import { GestureResponderEvent, StyleProp, Text, ViewStyle } from 'react-native';
import { useMoneyDiffStyles } from './MoneyDiff.style';

export interface MoneyDiffProps {
  id: string;
  name: string;
  amount: number;
  last?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  separatorStyle?: StyleProp<ViewStyle>;
}

export const MoneyDiff: React.FC<MoneyDiffProps> = ({ name, amount, last, onPress, separatorStyle }) => {
  const styles = useMoneyDiffStyles();

  return (
    <>
      <ListItem last={last} onPress={onPress} separatorStyle={separatorStyle}>
        <Text style={styles.moneyDiffName}>{name}</Text>
        <Number
          value={amount}
          style={[styles.moneyDiffAmount, amount < 0 ? styles.negativeDiff : styles.positiveDiff]}
          unit={' €'}
        />
      </ListItem>
    </>
  );
};
