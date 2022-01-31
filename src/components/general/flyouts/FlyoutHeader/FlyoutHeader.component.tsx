import React from 'react';
import { Text, View } from 'react-native';
import { useFlyoutHeaderStyles } from './FlyoutHeader.style';

type FlyoutHeaderProps = {
  heading?: string;
};

export const FlyoutHeader: React.FC<FlyoutHeaderProps> = ({ heading }) => {
  const styles = useFlyoutHeaderStyles();
  return (
    <View style={[styles.flyoutHeadingContainer]}>
      <Text style={[styles.flyoutHeadingLabel]}>{heading}</Text>
    </View>
  );
};
