import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const useSettingsStyles = () => {
  const { Content: Contents, Flyouts, Texts } = useStyle();
  return StyleSheet.create({
    header: {
      backgroundColor: Contents.background.bg2,
    },
    sectionHeaderContainer: {
      paddingVertical: 5,
      backgroundColor: Flyouts.background,
    },
    sectionHeaderLabel: {
      fontWeight: 'bold',
      color: Texts.colors.primary,
    },
  });
};
