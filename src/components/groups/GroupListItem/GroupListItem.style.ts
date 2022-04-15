import variables from '@moneyboy/config/variables';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const useGroupListItemStyles = () => {
  const { Groups, Flyouts } = useStyle();
  return StyleSheet.create({
    groupContainer: {
      width: '100%',
      maxHeight: '100%',
    },
    groupHeader: {},
    groupName: {
      color: Groups.header.color,
      fontSize: variables.font.size.medium,
      fontWeight: 'bold',
    },
    groupCaption: {
      color: Groups.caption.color,
      fontSize: variables.font.size.ultraSmall,
    },
    groupBody: {
      paddingVertical: 5,
    },
    membersList: {
      color: Groups.memberList.color,
    },
    recentPaymentHeaderContainer: {
      marginVertical: 10,
    },
    recentPaymentHeader: {
      color: Flyouts.heading.color,
      fontSize: variables.font.size.small,
      fontWeight: 'bold',
    },
    list: { flexGrow: 0 },
    separator: {
      backgroundColor: Flyouts.separator.color,
    },
  });
};
