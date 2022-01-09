import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { useSectionHeaderStyles } from './SectionHeader.style';

type SectionHeaderProps = {
  header: string;
  headerContainerStyle?: StyleProp<ViewStyle>;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ header, headerContainerStyle }) => {
  const styles = useSectionHeaderStyles();
  return (
    <View style={[styles.headerContainer, headerContainerStyle]}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
    </View>
  );
};
