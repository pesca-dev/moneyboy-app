import { ListItem } from '@moneyboy/components/general/lists/ListItem';
import variables from '@moneyboy/config/variables';
import { useStyle } from '@moneyboy/hooks/useStyle';
import React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

export interface MoneyDiffProps {
  id: string;
  name: string;
  amount: number;
  last?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  separatorStyle?: StyleProp<ViewStyle>;
}

export const MoneyDiff: React.FC<MoneyDiffProps> = ({ name, amount, last, onPress, separatorStyle }) => {
  const { Colors, Texts } = useStyle();
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
      <ListItem last={last} onPress={onPress} separatorStyle={separatorStyle}>
        <Text style={styles.moneyDiffName}>{name}</Text>
        <Text style={[styles.moneyDiffAmount, amount < 0 ? styles.negativeDiff : styles.positiveDiff]}>
          {amount.toFixed(2)} €
        </Text>
      </ListItem>
    </>
  );
};
