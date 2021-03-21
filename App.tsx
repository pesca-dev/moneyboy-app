import React from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';
import Card from './components/Card';
import Container from './components/Container';
import Content from './components/Content';
import Footer from './components/Footer';
import List from './components/List';
import MoneyDiff, { MoneyDiffProps } from './components/MoneyDiff';
import { SimpleButton } from './components/SimpleButton';
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
    <MoneyDiff
      key={uuid()}
      name={i.name}
      amount={i.amount}
      last={index === arr.length - 1}
    />
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
        <ScrollView style={styles.scrollView}>
          <Content>
            <Card header="Statistics">
              <List data={dummyData} render={renderList} />
            </Card>
            <Card header="Statistics">
              <List data={dummyData} render={renderList} />
            </Card>
            <Card header="Statistics">
              <List data={dummyData} render={renderList} />
            </Card>
          </Content>
        </ScrollView>
        <Footer>
          <Content>
            <SimpleButton
              title="New Payment"
              onPress={() => console.log('press')}
            />
          </Content>
        </Footer>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
});

export default App;
