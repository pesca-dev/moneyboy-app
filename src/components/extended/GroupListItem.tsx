import Content from '@components/structure/Content';
import ListItem from '@components/structure/ListItem';
import variables from '@config/variables';
import { ThemeContext } from '@context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type GroupListItemProps = {
  name: string;
  createdAt: number;
  members: string[];
  last?: boolean;
};

export default function GroupListItem({ name, createdAt, members, last }: GroupListItemProps) {
  const theme = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    groupContainer: {
      width: '100%',
    },
    groupHeader: {
      // flexDirection: 'row',
      // alignItems: 'center',
    },
    groupName: {
      color: theme.groups.header.color,
      fontSize: variables.font.size.medium,
      fontWeight: 'bold',
    },
    groupCaption: {
      color: theme.groups.caption.color,
      fontSize: variables.font.size.ultraSmall,
    },
    groupBody: {
      paddingVertical: 5,
    },
    membersList: {
      color: theme.groups.memberList.color,
    },
  });

  return (
    <Content>
      <ListItem last={last}>
        <View style={styles.groupContainer}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupName}>{name}</Text>
            <Text style={styles.groupCaption}>created at {new Date(createdAt).toLocaleDateString()}</Text>
          </View>
          <View style={styles.groupBody}>
            <Text numberOfLines={1} style={styles.membersList}>{`you, ${members.join(', ')}`}</Text>
          </View>
        </View>
      </ListItem>
    </Content>
  );
}
