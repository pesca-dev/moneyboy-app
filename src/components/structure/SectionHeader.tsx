import { StyleContext } from '@context/StyleContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type SectionHeaderProps = {
  header: string;
};

export default function SectionHeader({ header }: SectionHeaderProps) {
  const theme = React.useContext(StyleContext);
  const styles = StyleSheet.create({
    headerContainer: {
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: theme.list.header.background,
    },
    headerTextContainer: {
      width: '100%',
      // alignItems: 'center',
      padding: 10,
      // backgroundColor: '#fff',
      elevation: 10,
      shadowColor: theme.list.header.shadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
    },
    headerText: {
      fontSize: 42,
      fontWeight: 'bold',
      color: theme.list.header.color,
    },
  });
  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
    </View>
  );
}
