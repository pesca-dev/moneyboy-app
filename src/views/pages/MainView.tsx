import { MoneyDiffProps, MoneyDiff } from '@components/extended/MoneyDiff';
import { Content } from '@components/structure/Content';
import { SectionHeader } from '@components/structure/SectionHeader';
import { ViewBase } from '@components/structure/ViewBase';
import variables from '@config/variables';
import React from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo, StyleSheet } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

const dummyData: MoneyDiffProps[] = [
  {
    name: 'Friend A',
    amount: 14.56,
  },
  {
    name: 'Another Friend',
    amount: -7.13,
  },
  {
    name: 'Some Random Guy',
    amount: 5.69,
  },
];

const data = [
  {
    title: 'Statistics',
    data: dummyData,
  },
];

function renderListItem({ item, index, section }: SectionListRenderItemInfo<MoneyDiffProps, DefaultSectionT>) {
  return (
    <Content>
      <MoneyDiff key={uuid()} name={item.name} amount={item.amount} last={index === section.data.length - 1} />
    </Content>
  );
}

export function MainView() {
  return (
    <ViewBase>
      <SectionList
        style={[styles.scrollView]}
        sections={data}
        renderItem={renderListItem}
        keyExtractor={() => uuid()}
        renderSectionHeader={({ section: { title } }) => <SectionHeader key={uuid()} header={title} />}
      />
    </ViewBase>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  placeholder: {
    height: variables.display.placeholderTop.height,
  },
});
