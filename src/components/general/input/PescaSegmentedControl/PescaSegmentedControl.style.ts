import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const usePescaSegmentedControlStyles = () => {
  const { Texts, Buttons } = useStyle();
  return StyleSheet.create({
    label: {
      color: Texts.colors.primary,
    },
    tab: {
      backgroundColor: Buttons.special.segmented.background,
    },
  });
};
