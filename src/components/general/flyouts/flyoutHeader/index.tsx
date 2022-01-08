import { StyleContext } from '@moneyboy/context/styleContext';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FlyoutHeaderProps = {
  heading?: string;
};

export const FlyoutHeader: React.FC<FlyoutHeaderProps> = ({ heading }) => {
  const { Flyouts } = useContext(StyleContext);
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
