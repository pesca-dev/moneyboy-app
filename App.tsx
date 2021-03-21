import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
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
    <>
      <MoneyDiff name={i.name} amount={i.amount} />
      {(() => {
        if (index < arr.length - 1) {
          return <Separator />;
        }
      })()}
    </>
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
