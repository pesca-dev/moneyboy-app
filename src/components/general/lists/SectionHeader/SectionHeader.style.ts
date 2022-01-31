import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const useSectionHeaderStyles = () => {
  const { Lists } = useStyle();
  return StyleSheet.create({
    headerContainer: {
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: Lists.header.background,
    },
    headerTextContainer: {
      width: '100%',
      paddingHorizontal: 10,
      paddingBottom: 10,
      elevation: 10,
      shadowColor: Lists.header.shadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
    },
    headerText: {
      fontSize: 42,
      fontWeight: 'bold',
      color: Lists.header.color,
    },
  });
};
