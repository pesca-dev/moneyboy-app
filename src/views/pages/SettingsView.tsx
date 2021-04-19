import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PescaButton from '@components/input/PescaButton';
import { AuthContext } from '@context/AuthContext';
import Card from '@components/structure/Card';
import Content from '@components/structure/Content';
import ListItem from '@components/structure/ListItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingsView() {
  const { user, logout } = React.useContext(AuthContext);

  // TODO lome: Add structure for menu points
  return (
    <View style={styles.container}>
      {/* <Text style={styles.username}>{user?.displayName}</Text> */}
      <Content>
        <Card header={user?.displayName}>
          <ListItem last>
            <PescaButton onPress={logout}>
              <View style={[styles.logoutContainer]}>
                <MaterialCommunityIcons name="arrow-right" style={[styles.logoutIcon]} />
                <Text style={[styles.logoutText]}>Logout</Text>
              </View>
            </PescaButton>
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
  logoutContainer: {
    flexDirection: 'row',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 5,
    color: '#e74c3c',
  },
  logoutText: {
    fontSize: 16,
    color: '#e74c3c',
  },
});
