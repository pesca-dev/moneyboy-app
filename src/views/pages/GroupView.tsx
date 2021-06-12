import React from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

import SectionHeader from '@components/structure/SectionHeader';
import ViewBase from '@components/structure/ViewBase';
import GroupListItem from '@components/extended/GroupListItem';

type Group = {
  name: string;
  createdAt: number;
  members: string[];
};

const groups: Group[] = [
  {
    name: 'Hello',
    createdAt: Date.now(),
    members: ['Louis', 'Hendrik', 'Vivi', 'Nico', 'Louis', 'Hendrik', 'Vivi', 'Nico'],
  },
  {
    name: 'Hello',
    createdAt: Date.now(),
    members: ['Louis', 'Hendrik', 'Vivi', 'Nico'],
  },
  {
    name: 'Hello',
    createdAt: Date.now(),
    members: ['Louis', 'Hendrik', 'Vivi', 'Nico'],
  },
  {
    name: 'Hello',
    createdAt: Date.now(),
    members: ['Louis', 'Hendrik', 'Vivi', 'Nico'],
  },
];

const data = [
  {
    title: 'Groups',
    data: groups,
  },
];

export default function GroupView() {
  function renderListItem({ item, index, section }: SectionListRenderItemInfo<Group, DefaultSectionT>) {
    return <GroupListItem {...item} last={index === section.data.length - 1} />;
  }

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
