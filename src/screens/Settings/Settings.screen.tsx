import { FlyoutHeader } from '@moneyboy/components/general/flyouts/FlyoutHeader';
import { ListItem } from '@moneyboy/components/general/lists/ListItem';
import { Separator } from '@moneyboy/components/general/lists/Separator';
import { createPescaNavigation } from '@moneyboy/components/general/navigation/PescaNavigator/createPescaNavigation';
import { PescaNavigatorProps } from '@moneyboy/components/general/navigation/PescaNavigator/PescaNavigator';
import { ScreenComponentProps } from '@moneyboy/components/general/navigation/PescaNavigator/PescaScreen';
import { Content } from '@moneyboy/components/general/structure/Content';
import { LogoutButton } from '@moneyboy/components/settings/LogoutButton';
import { ThemeSwitch } from '@moneyboy/components/settings/ThemeSwitch';
import { useAuth } from '@moneyboy/hooks/useAuth';
import React from 'react';
import { DefaultSectionT, SectionList, SectionListData, SectionListRenderItemInfo, Text, View } from 'react-native';
import { useSettingsStyles } from './Settings.style';

type SettingsViewProps = PescaNavigatorProps;

type SettingsViewListEntry = {
  id: string;
  content: JSX.Element;
};

type SettingsViewListData = {
  title: string;
  data: SettingsViewListEntry[];
};

const Pesca = createPescaNavigation();

type SettingsMainViewParams = unknown;

const SettingsMainView: React.FC<ScreenComponentProps<SettingsMainViewParams>> = ({ navigation }) => {
  const { loggedIn } = useAuth();

  const styles = useSettingsStyles();

  const data: SettingsViewListData[] = [
    {
      title: 'General',
      data: [
        {
          id: 'Settings-theme-switch',
          content: <ThemeSwitch />,
        },
      ],
    },
  ];

  function renderItem({
    item: { content },
    index,
    section,
  }: SectionListRenderItemInfo<SettingsViewListEntry, DefaultSectionT>) {
    return <ListItem last={index === section.data.length - 1}>{content}</ListItem>;
  }

  function renderSectionHeader({
    section: { title },
  }: {
    section: SectionListData<SettingsViewListEntry, SettingsViewListData>;
  }) {
    return (
      <View style={[styles.sectionHeaderContainer]}>
        <Text style={[styles.sectionHeaderLabel]}>{title}</Text>
      </View>
    );
  }

  return (
    <>
      <FlyoutHeader heading={'Settings'} />
      <SectionList
        sections={data}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
        renderSectionHeader={renderSectionHeader}
        scrollEnabled={false}
        stickySectionHeadersEnabled
      />
      {loggedIn && (
        <Content>
          <Separator />
          <ListItem last>
            <LogoutButton onPress={navigation.close} />
          </ListItem>
        </Content>
      )}
    </>
  );
};

export const SettingsView: React.FC<SettingsViewProps> = ({ isOpen, setOpen }) => (
  // TODO lome: Add structure for menu points
  <Pesca.Navigator setOpen={setOpen} isOpen={isOpen}>
    <Pesca.Screen name="SettingsMainScreen" component={SettingsMainView} testID={'settings-main-view'} />
  </Pesca.Navigator>
);
