import variables from '@config/variables';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CardHeaderProps = {
  header: string;
};

export default function CardHeader({ header }: CardHeaderProps) {
  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
      <View style={styles.borderFaker} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: variables.font.size.large,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  borderFaker: {
    height: 1,
    borderRadius: 2,
    width: '100%',
    backgroundColor: '#7f8c8d',
  },
});
