import { PescaButton } from '@components/input/PescaButton';
import { StyleContext } from '@context/StyleContext';
import { SettingsView } from '@views/pages/SettingsView';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingsPanel() {
  const [isOpen, setOpen] = useState(false);
  const { Tabs } = useContext(StyleContext);
  const { top, right } = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: top + 20,
      right: right + 5,
      height: 50,
      width: 50,
    },
    icon: {
      fontSize: 28,
      color: Tabs.focus.color,
    },
  });
  return (
    <>
      <View style={[styles.container]}>
        <PescaButton onPress={() => setOpen(true)}>
          <MaterialCommunityIcons name="cog-outline" style={[styles.icon]} />
        </PescaButton>
      </View>
      <SettingsView isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
