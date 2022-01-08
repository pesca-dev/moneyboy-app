import { MoneyDiff, MoneyDiffProps } from '@moneyboy/components/extended/MoneyDiff';
import { Flyout } from '@moneyboy/components/general/flyouts/flyout';
import { ListItem } from '@moneyboy/components/general/lists/listItem';
import { Content } from '@moneyboy/components/structure/Content';
import variables from '@moneyboy/config/variables';
import { StyleContext } from '@moneyboy/context/StyleContext';
import React, { useContext, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import uuid from 'react-native-uuid';

type GroupListItemProps = {
  name: string;
  createdAt: number;
  members: string[];
  last?: boolean;
};

const dummyData: MoneyDiffProps[] = [
  {
    id: uuid.v4() as string,
    name: 'Friend A',
    amount: -14.56,
  },
  {
    id: uuid.v4() as string,
    name: 'Another Friend',
    amount: -7.13,
  },
  {
    id: uuid.v4() as string,
    name: 'Another Friend',
    amount: -17.56,
  },
  {
    id: uuid.v4() as string,
    name: 'Another Friend',
    amount: -2.99,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -55.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -55.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -55.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    id: uuid.v4() as string,
    name: 'Some Random Guy',
    amount: -5.69,
  },
];

export const GroupListItem: React.FC<GroupListItemProps> = ({ name, createdAt, members, last }) => {
  const { Groups, Flyouts } = useContext(StyleContext);
  const styles = StyleSheet.create({
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

  function renderItem(info: ListRenderItemInfo<MoneyDiffProps>) {
    return <MoneyDiff key={info.index} separatorStyle={styles.separator} {...info.item} />;
  }

  const [open, setOpen] = useState(false);
  return (
    <>
      <Content>
        <ListItem last={last} onPress={() => setOpen(true)}>
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
      {/* Flyout with information about group */}
      <Flyout isOpen={open} close={() => setOpen(false)}>
        <View style={styles.groupContainer}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupName}>{name}</Text>
            <Text style={styles.groupCaption}>created at {new Date(createdAt).toLocaleDateString()}</Text>
          </View>
          <View style={styles.groupBody}>
            <Text style={styles.membersList}>{`you, ${members.join(', ')}`}</Text>
            <View style={styles.recentPaymentContainer}>
              <View style={styles.recentPaymentHeaderContainer}>
                <Text style={styles.recentPaymentHeader}>Recent Payments</Text>
              </View>
              <FlatList
                initialNumToRender={20}
                data={dummyData}
                renderItem={renderItem}
                keyExtractor={({ id }) => id}
              />
            </View>
          </View>
        </View>
      </Flyout>
    </>
  );
};
