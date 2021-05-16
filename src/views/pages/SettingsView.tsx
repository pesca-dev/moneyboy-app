import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthContext } from '@context/AuthContext';
import Card from '@components/structure/Card';
import Content from '@components/structure/Content';
import ListItem from '@components/structure/ListItem';
import LogoutButton from '@components/extended/LogoutButton';

export default function SettingsView() {
  const { user } = React.useContext(AuthContext);

  // TODO lome: Add structure for menu points
  return (
    <View style={styles.container}>
      {/* <Text style={styles.username}>{user?.displayName}</Text> */}
      <Content>
        <Card header={user?.displayName}>
          <ListItem last>
            <LogoutButton />
          </ListItem>
        </Card>
      </Content>
    </View>
  );
}

const styles = StyleSheet.create({
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
