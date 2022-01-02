import { GroupListItem } from '@components/extended/GroupListItem';
import { SectionHeader } from '@components/structure/SectionHeader';
import { ViewBase } from '@components/structure/ViewBase';
import React from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';
import uuid from 'react-native-uuid';

type Group = {
  id: string;
  name: string;
  createdAt: number;
  members: string[];
};

const groups: Group[] = [
  {
    id: uuid.v4() as string,
    name: 'Hello',
    createdAt: Date.now(),
    members: ['Louis', 'Hendrik', 'Vivi', 'Nico', 'Louis', 'Hendrik', 'Vivi', 'Nico'],
  },
  {
    id: uuid.v4() as string,
    name: 'Hello',
    createdAt: Date.now(),
    members: ['Louis', 'Hendrik', 'Vivi', 'Nico'],
  },
  {
    id: uuid.v4() as string,
    name: 'Hello',
    createdAt: Date.now(),
    members: ['Louis', 'Hendrik', 'Vivi', 'Nico'],
  },
  {
    id: uuid.v4() as string,
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

type GroupViewProps = unknown;

export const GroupView: React.FC<GroupViewProps> = () => {
  function renderListItem({ item, index, section }: SectionListRenderItemInfo<Group, DefaultSectionT>) {
    return <GroupListItem {...item} last={index === section.data.length - 1} />;
  }

  return (
    <ViewBase>
      <SectionList
        sections={data}
        keyExtractor={({ id }) => id}
        renderItem={renderListItem}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader key={`groupview-section-header-${title}`} header={title} />
        )}
      />
    </ViewBase>
  );
};
