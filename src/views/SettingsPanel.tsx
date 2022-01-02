import { PescaButton } from '@components/input/PescaButton';
import { StyleContext } from '@context/StyleContext';
import { SettingsView } from '@views/settings/SettingsView';
import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingsPanel() {
  const [isOpen, setOpen] = useState(false);
  const { Tabs } = useContext(StyleContext);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    iconContainer: {
      marginHorizontal: 30,
      marginTop: 20,
      // height: 32,
    },
    icon: {
      fontSize: 28,
      color: Tabs.focus.color,
    },
  });
  return (
    <>
      <View style={[styles.container]}>
        <SafeAreaView>
          <View style={[styles.iconContainer]}>
            <PescaButton onPress={() => setOpen(true)}>
              <MaterialCommunityIcons name="cog-outline" style={[styles.icon]} />
            </PescaButton>
          </View>
        </SafeAreaView>
      </View>
      <SettingsView isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
