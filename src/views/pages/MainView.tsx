import { MoneyDiff, MoneyDiffProps } from '@components/extended/MoneyDiff';
import { Content } from '@components/structure/Content';
import { SectionHeader } from '@components/structure/SectionHeader';
import { ViewBase } from '@components/structure/ViewBase';
import variables from '@config/variables';
import React from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo, StyleSheet } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

const dummyData: MoneyDiffProps[] = [
  {
    id: uuid(),
    name: 'Friend A',
    amount: 14.56,
  },
  {
    id: uuid(),
    name: 'Another Friend',
    amount: -7.13,
  },
  {
    id: uuid(),
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

function renderListItem({
  item: { name, amount, id },
  // item,
  index,
  section,
}: SectionListRenderItemInfo<MoneyDiffProps, DefaultSectionT>) {
  return (
    <Content>
      <MoneyDiff key={id} id={id} name={name} amount={amount} last={index === section.data.length - 1} />
    </Content>
  );
}

type MainViewProps = {};

export const MainView: React.FC<MainViewProps> = () => {
  return (
    <ViewBase>
      <SectionList
        style={[styles.scrollView]}
        sections={data}
        renderItem={renderListItem}
        keyExtractor={({ id }) => `mainview-moneydiff-${id}`}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader key={`mainview-section-${title}`} header={title} />
        )}
      />
    </ViewBase>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  placeholder: {
    height: variables.display.placeholderTop.height,
  },
});
