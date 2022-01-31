import { useStyle } from '@moneyboy/hooks/useStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export const useSettingsPanelStyles = () => {
  const { Tabs } = useStyle();
  const { top, right } = useSafeAreaInsets();
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: top + 20,
      right: right + 5,
      height: 50,
      width: 50,
    },
    icon: {
      fontSize: 28,
      color: Tabs.focus.color,
    },
  });
};
