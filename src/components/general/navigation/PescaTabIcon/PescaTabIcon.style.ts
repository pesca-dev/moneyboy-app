import variables from '@moneyboy/config/variables';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const usePescaTabIconStyles = () => {
  const { Tabs } = useStyle();
  return StyleSheet.create({
    tab: {
      minWidth: 32,
      height: 32,
      justifyContent: 'center',
    },
    icon: {
      fontSize: variables.font.size.large,
      color: Tabs.default.color,
    },
    focus: {
      color: Tabs.focus.color,
      shadowColor: Tabs.focus.shadow,
      shadowRadius: 10,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.6,
    },
    disabled: Tabs.disabled,
  });
};
