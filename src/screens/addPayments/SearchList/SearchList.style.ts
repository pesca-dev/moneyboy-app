import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const useSearchListStyles = () => {
  const { Buttons, Flyouts, Texts, Input } = useStyle();
  return StyleSheet.create({
    flyoutHeaderContainer: {
      marginBottom: 10,
    },
    flyoutHeading: {
      color: Flyouts.heading.color,
      fontSize: Flyouts.heading.fontSize,
      fontWeight: 'bold',
    },
    submitButtonContainer: {
      width: '100%',
      backgroundColor: Buttons.primary.active.background,
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: Buttons.primary.active.color,
    },
    inputLabel: {
      color: Input.label.color,
    },
    sectionHeaderContainer: {
      paddingVertical: 5,
      backgroundColor: Flyouts.background,
    },
    sectionHeaderLabel: {
      fontWeight: 'bold',
      color: Texts.colors.primary,
    },
    list: {
      flexGrow: 0,
    },
    listItem: {
      fontSize: 16,
      color: Texts.colors.primary,
    },
    separator: {
      backgroundColor: Flyouts.separator.color,
    },
  });
};
