import { useStyle } from '@moneyboy/hooks/useStyle';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FlyoutHeaderProps = {
  heading?: string;
};

export const FlyoutHeader: React.FC<FlyoutHeaderProps> = ({ heading }) => {
  const { Flyouts } = useStyle();
  const styles = StyleSheet.create({
    flyoutHeadingContainer: {
      width: '100%',
      height: 30,
    },
    flyoutHeadingLabel: {
      color: Flyouts.heading.color,
      fontSize: Flyouts.heading.fontSize,
      fontWeight: 'bold',
    },
  });
  return (
    <View style={[styles.flyoutHeadingContainer]}>
      <Text style={[styles.flyoutHeadingLabel]}>{heading}</Text>
    </View>
  );
};
