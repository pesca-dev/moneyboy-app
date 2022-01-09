import { useStyle } from '@moneyboy/hooks/useStyle';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type SectionHeaderProps = {
  header: string;
  headerContainerStyle?: StyleProp<ViewStyle>;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ header, headerContainerStyle }) => {
  const { Lists } = useStyle();
  const styles = StyleSheet.create({
    headerContainer: {
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: Lists.header.background,
    },
    headerTextContainer: {
      width: '100%',
      paddingHorizontal: 10,
      paddingBottom: 10,
      elevation: 10,
      shadowColor: Lists.header.shadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
    },
    headerText: {
      fontSize: 42,
      fontWeight: 'bold',
      color: Lists.header.color,
    },
  });
  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
    </View>
  );
};
