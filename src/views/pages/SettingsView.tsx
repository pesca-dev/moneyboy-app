import { LogoutButton } from '@components/extended/LogoutButton';
import { createPescaNavigation } from '@components/navigation/pesca-navigator/createPescaNavigation';
import { PescaNavigatorProps } from '@components/navigation/pesca-navigator/pescaNavigator';
import { ScreenComponentProps } from '@components/navigation/pesca-navigator/pescaScreen';
import { ThemeSwitch } from '@components/settings/ThemeSwitch';
import { Content } from '@components/structure/Content';
import { FlyoutHeader } from '@components/structure/FlyoutHeader';
import { ListItem } from '@components/structure/ListItem';
import { Separator } from '@components/structure/Separator';
import { AuthContext } from '@context/AuthContext';
import { StyleContext } from '@context/StyleContext';
import React, { useContext } from 'react';
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
  const { loggedIn } = useContext(AuthContext);

  const { Content: Contents, Flyouts, Texts } = useContext(StyleContext);

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
