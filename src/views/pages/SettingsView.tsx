import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthContext } from '@context/AuthContext';
import Content from '@components/structure/Content';
import ListItem from '@components/structure/ListItem';
import LogoutButton from '@components/extended/LogoutButton';
import Container from '@components/structure/Container';
import PescaCard from '@components/extended/PescaCard';

export default function SettingsView() {
  const { user } = React.useContext(AuthContext);

  // TODO lome: Add structure for menu points
  return (
    <Container>
      <Content>
        <View style={styles.placeholder} />
        <PescaCard header={user?.displayName}>
          <ListItem last>
            <LogoutButton />
          </ListItem>
        </PescaCard>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    height: 60,
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
