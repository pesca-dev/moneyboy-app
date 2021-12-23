import { LogoutButton } from '@components/extended/LogoutButton';
import { Content } from '@components/structure/Content';
import { ListItem } from '@components/structure/ListItem';
import { SectionHeader } from '@components/structure/SectionHeader';
import { ViewBase } from '@components/structure/ViewBase';
import { AuthContext } from '@context/AuthContext';
import React from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';

type SettingsViewProps = {};

type SettingsViewListData = {
  title: any;
  data: SettingsViewListEntry[];
};

type SettingsViewListEntry = {
  id: string;
  content: JSX.Element;
};

export const SettingsView: React.FC<SettingsViewProps> = () => {
  const { user } = React.useContext(AuthContext);

  const data: SettingsViewListData[] = [
    {
      title: <SectionHeader key={'settings-displayname'} header={user?.displayName ?? ''} />,
      data: [
        {
          id: 'settings-view-logout',
          content: (
            <Content>
              <ListItem last>
                <LogoutButton />
              </ListItem>
            </Content>
          ),
        },
      ],
    },
  ];

  function renderItem({ item: { content } }: SectionListRenderItemInfo<SettingsViewListEntry, DefaultSectionT>) {
    return content;
  }

  // TODO lome: Add structure for menu points
  return (
    <ViewBase>
      <SectionList
        sections={data}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
        renderSectionHeader={({ section: { title } }) => title}
        scrollEnabled={false}
      />
    </ViewBase>
  );
};
