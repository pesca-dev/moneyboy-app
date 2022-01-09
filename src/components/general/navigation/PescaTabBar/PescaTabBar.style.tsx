import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const usePescaTabBarStyles = () => {
  const insets = useSafeAreaInsets();
  const { Content } = useStyle();
  return StyleSheet.create({
    safeAreaView: {
      backgroundColor: Content.background.dp01,
    },
    footer: {
      height: 64,
      marginBottom: insets.bottom ? 0 : 20, // if we are on an older device, use some default padding
    },
    tabBarContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 8,
    },
    tabContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
};
