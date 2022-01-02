import { LogoutButton } from '@components/extended/LogoutButton';
import { createPescaNavigation } from '@components/navigation/pesca-navigator/createPescaNavigation';
import { PescaNavigatorProps } from '@components/navigation/pesca-navigator/pescaNavigator';
import { ScreenComponentProps } from '@components/navigation/pesca-navigator/pescaScreen';
import { Content } from '@components/structure/Content';
import { ListItem } from '@components/structure/ListItem';
import { SectionHeader } from '@components/structure/SectionHeader';
import { AuthContext } from '@context/AuthContext';
import React from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';

type SettingsViewProps = PescaNavigatorProps;

type SettingsViewListEntry = {
  id: string;
  content: JSX.Element;
};

type SettingsViewListData = {
  title: unknown;
  data: SettingsViewListEntry[];
};

const Pesca = createPescaNavigation();

type SettingsMainViewParams = unknown;

const SettingsMainView: React.FC<ScreenComponentProps<SettingsMainViewParams>> = ({ navigation }) => {
  const { user } = React.useContext(AuthContext);
  const data: SettingsViewListData[] = [
    {
      title: <SectionHeader key={'settings-displayname'} header={user?.displayName ?? 'Settings'} />,
      data: [
        {
          id: 'settings-view-logout',
          content: (
            <Content>
              <ListItem>
                <LogoutButton onPress={navigation.close} />
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

  return (
    <SectionList
      sections={data}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      renderSectionHeader={({ section: { title } }) => title}
      scrollEnabled={true}
    />
  );
};

export const SettingsView: React.FC<SettingsViewProps> = ({ isOpen, setOpen }) => (
  // TODO lome: Add structure for menu points
  <Pesca.Navigator setOpen={setOpen} isOpen={isOpen}>
    <Pesca.Screen name="SettingsMainScreen" component={SettingsMainView} />
  </Pesca.Navigator>
);
