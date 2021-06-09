import React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import { AuthContext } from '@context/AuthContext';
import Content from '@components/structure/Content';
import ListItem from '@components/structure/ListItem';
import LogoutButton from '@components/extended/LogoutButton';
import Container from '@components/structure/Container';
import variables from '@config/variables';
import { v4 as uuid } from 'react-native-uuid';
import SectionHeader from '@components/structure/SectionHeader';

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
    <Container>
      <View style={[styles.placeholder]} />
      <SectionList
        sections={data}
        renderItem={({ item }) => item}
        keyExtractor={() => uuid()}
        renderSectionHeader={({ section: { title } }) => title}
        scrollEnabled={false}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    height: variables.display.placeholderTop.height,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
  },
  username: {
    marginBottom: 40,
  },
  separatorStyle: {
    marginHorizontal: 0,
  },
});
