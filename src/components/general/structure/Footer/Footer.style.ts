import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const useFooterStyles = () => {
  const { Content, Footers } = useStyle();
  return StyleSheet.create({
    footerWrapper: {
      backgroundColor: Content.background.bg0,
      marginHorizontal: 20,
    },
    footer: {
      height: 60,
      backgroundColor: Footers.background,
      shadowColor: Footers.shadow,
      borderRadius: 20,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      justifyContent: 'center',
    },
  });
};
