import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const useGroupListItemStyles = () => {
  const { Groups, Flyouts } = useStyle();
  return StyleSheet.create({
    groupContainer: {
      width: '100%',
    },
    groupHeader: {
      // flexDirection: 'row',
      // alignItems: 'center',
    },
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
    recentPaymentContainer: {
      marginVertical: 10,
      maxHeight: '90%',
    },
    recentPaymentHeaderContainer: {
      marginBottom: 10,
    },
    recentPaymentHeader: {
      color: Flyouts.heading.color,
      fontSize: variables.font.size.small,
      fontWeight: 'bold',
    },
    separator: {
      backgroundColor: Flyouts.separator.color,
    },
  });
};
