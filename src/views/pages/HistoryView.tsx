import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';
import { NavigationHelpers, ParamListBase, RouteProp } from '@react-navigation/native';

import MoneyDiff, { MoneyDiffProps } from '@components/extended/MoneyDiff';
import { FlyoutContext } from '@context/FlyoutContext';
import Container from '@components/structure/Container';
import Content from '@components/structure/Content';
import List from '@components/structure/List';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import PescaCard from '@components/extended/PescaCard';

const dummyPayments: MoneyDiffProps[] = [
  {
    name: 'Friend A',
    amount: -14.56,
  },
  {
    name: 'Another Friend',
    amount: -7.13,
  },
  {
    name: 'Another Friend',
    amount: -17.56,
  },
  {
    name: 'Another Friend',
    amount: -2.99,
  },
  {
    name: 'Some Random Guy',
    amount: -5.69,
  },
  {
    name: 'Some Random Guy',
    amount: -55.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -50000.69,
  },
  {
    name: 'Some Random Guy',
    amount: -5.69,
  },
];

type HistoryViewProps = {
  route: RouteProp<ParamListBase, any>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

export default function HistoryView({}: HistoryViewProps) {
  const flyout = React.useContext(FlyoutContext);

  function openFlyout(children: ReactNode) {
    flyout.setChildren(children, true);
  }

  // TODO lome: Remove inline
  function renderFlyoutContent(p: MoneyDiffProps) {
    return (
      <View style={{ height: 80 }}>
        <Text style={{ fontSize: 24 }}>Person: {p.name}</Text>
        <Text style={{ fontSize: 24 }}>Amount: {p.amount}</Text>
      </View>
    );
  }

  function renderListItem(i: MoneyDiffProps, index: number, arr: MoneyDiffProps[]) {
    return (
      <MoneyDiff
        key={uuid()}
        name={i.name}
        amount={i.amount}
        last={index === arr.length - 1}
        onPress={() => openFlyout(renderFlyoutContent(i))}
      />
    );
  }

  function renderList(data: MoneyDiffProps[]) {
    return data.map(renderListItem);
  }

  return (
    <>
      <Container>
        <ScrollView style={styles.scrollView}>
          <Content>
            <View style={styles.placeholder} />
            <PescaCard header="History">
              <List data={dummyPayments} render={renderList} />
            </PescaCard>
          </Content>
          <View style={styles.placeholder} />
        </ScrollView>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  placeholder: {
    height: 60,
  },
});