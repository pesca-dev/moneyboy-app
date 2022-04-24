import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const usePescaTabBarStyles = () => {
  const insets = useSafeAreaInsets();
  const { Content, Footers } = useStyle();
  return StyleSheet.create({
    safeAreaView: {
      backgroundColor: Content.background.dp01,
    },
    footerWrapper: {
      marginHorizontal: 20,
    },
    footer: {
      height: 64,
      marginBottom: insets.bottom ? 0 : 20, // if we are on an older device, use some default padding
      shadowColor: Footers.shadow,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      justifyContent: 'center',
    },
    tabBarWrapper: {
      position: 'absolute',
      height: 64,
      width: '100%',
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
