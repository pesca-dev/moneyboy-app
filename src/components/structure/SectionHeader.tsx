import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type SectionHeaderProps = {
  header: string;
};

export default function SectionHeader({ header }: SectionHeaderProps) {
  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  headerTextContainer: {
    width: '100%',
    // alignItems: 'center',
    padding: 10,
    // backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#42423d',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
  },
  headerText: {
    fontSize: 42,
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
