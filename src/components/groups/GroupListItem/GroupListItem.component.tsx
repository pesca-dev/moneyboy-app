import { Flyout } from '@moneyboy/components/general/flyouts/Flyout';
import { ListItem } from '@moneyboy/components/general/lists/ListItem';
import { MoneyDiff, MoneyDiffProps } from '@moneyboy/components/general/payments/MoneyDiff';
import { Content } from '@moneyboy/components/general/structure/Content';
import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, Pressable, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
import { useGroupListItemStyles } from './GroupListItem.style';

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
  const styles = useGroupListItemStyles();

  function renderItem(info: ListRenderItemInfo<MoneyDiffProps>) {
    return <MoneyDiff key={info.index} separatorStyle={styles.separator} {...info.item} />;
  }

  const [open, setOpen] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(0);

  const toggleMemberList = useCallback(() => {
    setNumberOfLines(curNumberOfLines => (curNumberOfLines === 0 ? 1 : 0));
  }, [setNumberOfLines]);

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
            <Pressable onPress={toggleMemberList}>
              <Text numberOfLines={numberOfLines} style={styles.membersList}>{`you, ${members.join(', ')}`}</Text>
            </Pressable>
            <View style={styles.recentPaymentHeaderContainer}>
              <Text style={styles.recentPaymentHeader}>Recent Payments</Text>
            </View>
          </View>
          <FlatList
            initialNumToRender={20}
            data={dummyData}
            renderItem={renderItem}
            keyExtractor={({ id }) => id}
            style={[styles.list]}
          />
        </View>
      </Flyout>
    </>
  );
};
