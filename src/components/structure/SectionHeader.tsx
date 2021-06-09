import variables from '@config/variables';
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
    backgroundColor: variables.themes.light.background.primary,
  },
  headerTextContainer: {
    width: '100%',
    // alignItems: 'center',
    padding: 10,
    // backgroundColor: '#fff',
    elevation: 10,
    shadowColor: variables.themes.light.shadow.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
  },
  headerText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: variables.themes.light.text.secondary,
  },
});
