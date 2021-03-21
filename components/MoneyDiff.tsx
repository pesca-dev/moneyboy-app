import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

export interface MoneyDiffProps {
  name: string;
  amount: number;
}

export default function MoneyDiff({ name, amount }: MoneyDiffProps) {
  return (
    <View key={uuid()} style={styles.moneyDiffContainer}>
      <Text style={styles.moneyDiffName}>{name}</Text>
      <Text
        style={[
          styles.moneyDiffAmount,
          amount < 0 ? styles.negativeDiff : styles.positiveDiff,
        ]}>
        {amount} €
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  moneyDiffContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
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
