import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const useFlyoutHeaderStyles = () => {
  const { Flyouts } = useStyle();
  return StyleSheet.create({
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
};
