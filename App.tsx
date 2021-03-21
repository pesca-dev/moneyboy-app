import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';
import Container from './components/Container';
import List from './components/List';
import MoneyDiff, { MoneyDiffProps } from './components/MoneyDiff';
import Separator from './components/Separator';

declare const global: { HermesInternal: null | {} };

const dummyData: MoneyDiffProps[] = [
  {
    name: 'Helena',
    amount: 14.56,
  },
  {
    name: 'Hendrik',
    amount: -7.13,
  },
  {
    name: 'Dennis',
    amount: 5.69,
  },
];

function renderListItem(
  i: MoneyDiffProps,
  index: number,
  arr: MoneyDiffProps[],
) {
  return (
    <View key={uuid()}>
      <MoneyDiff name={i.name} amount={i.amount} />
      {(() => {
        if (index < arr.length - 1) {
          return <Separator />;
        }
      })()}
    </View>
  );
}

function renderList(data: MoneyDiffProps[]) {
  return data.map(renderListItem);
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Container>
        <ScrollView>
          <List header="Statistics" data={dummyData} render={renderList} />
        </ScrollView>
      </Container>
    </>
  );
};

export default App;
