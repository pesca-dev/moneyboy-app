import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { SettingsView } from '@moneyboy/screens/settings';
import React, { useState } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSettingsPanelStyles } from './SettingsPanel.style';

export const SettingsPanel: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const styles = useSettingsPanelStyles();
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
};
