import React, { VFC } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

type NumberProps = {
  value: number;
  style?: StyleProp<TextStyle>;
  unit?: string;
};

export const Number: VFC<NumberProps> = ({ value, style, unit }) => (
  <Text style={style}>
    {`${Intl.NumberFormat('de-de', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value)}${unit ?? ''}`}
  </Text>
);
