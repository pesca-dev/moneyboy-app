import React from 'react';
import { SectionList } from 'react-native';

import { AuthContext } from '@context/AuthContext';
import Content from '@components/structure/Content';
import ListItem from '@components/structure/ListItem';
import LogoutButton from '@components/extended/LogoutButton';
import { v4 as uuid } from 'react-native-uuid';
import SectionHeader from '@components/structure/SectionHeader';
import ViewBase from '@components/structure/ViewBase';

export default function SettingsView() {
  const { user } = React.useContext(AuthContext);

  const data = [
    {
      title: <SectionHeader key={uuid()} header={user?.displayName ?? ''} />,
      data: [
        <Content>
          <ListItem last>
            <LogoutButton />
          </ListItem>
        </Content>,
      ],
    },
  ];

  // TODO lome: Add structure for menu points
  return (
    <ViewBase>
      <SectionList
        sections={data}
        renderItem={({ item }) => item}
        keyExtractor={() => uuid()}
        renderSectionHeader={({ section: { title } }) => title}
        scrollEnabled={false}
      />
    </ViewBase>
  );
}
