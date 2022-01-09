import { FlyoutHeader } from '@moneyboy/components/general/flyouts/FlyoutHeader';
import { ListItem } from '@moneyboy/components/general/lists/ListItem';
import { Separator } from '@moneyboy/components/general/lists/Separator';
import { createPescaNavigation } from '@moneyboy/components/general/navigation/pesca-navigator/createPescaNavigation';
import { PescaNavigatorProps } from '@moneyboy/components/general/navigation/pesca-navigator/pescaNavigator';
import { ScreenComponentProps } from '@moneyboy/components/general/navigation/pesca-navigator/pescaScreen';
import { Content } from '@moneyboy/components/general/structure/content';
import { LogoutButton } from '@moneyboy/components/settings/logoutButton';
import { ThemeSwitch } from '@moneyboy/components/settings/themeSwitch';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { useStyle } from '@moneyboy/hooks/useStyle';
import React from 'react';
import {
  DefaultSectionT,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

  const { Content: Contents, Flyouts, Texts } = useStyle();

  const styles = StyleSheet.create({
    header: {
      backgroundColor: Contents.background.dp16,
    },
    sectionHeaderContainer: {
      paddingVertical: 5,
      backgroundColor: Flyouts.background,
    },
    sectionHeaderLabel: {
      fontWeight: 'bold',
      color: Texts.colors.primary,
    },
  });

  const data: SettingsViewListData[] = [
    {
      title: 'General',
      data: [
        {
          id: 'settings-theme-switch',
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
    <Pesca.Screen name="SettingsMainScreen" component={SettingsMainView} />
  </Pesca.Navigator>
);
