import MoneyDiff from '@components/extended/MoneyDiff';
import SectionHeader from '@components/structure/SectionHeader';
import Content from '@components/structure/Content';
import React from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';
import ViewBase from '@components/structure/ViewBase';

const data = [
  {
    title: 'Groups',
    data: [
      {
        text: 'Hello',
      },
      {
        text: 'Hello',
      },
      {
        text: 'Hello',
      },
      {
        text: 'Hello',
      },
    ],
  },
];

function renderListItem({ item, index, section }: SectionListRenderItemInfo<{ text: string }, DefaultSectionT>) {
  return (
    <Content>
      <MoneyDiff key={uuid()} name={item.text} amount={0} last={index === section.data.length - 1} />
    </Content>
  );
}

export default function GroupView() {
  return (
    <ViewBase>
      <SectionList
        sections={data}
        keyExtractor={() => uuid()}
        renderItem={renderListItem}
        renderSectionHeader={({ section: { title } }) => <SectionHeader key={uuid()} header={title} />}
      />
    </ViewBase>
  );
}
