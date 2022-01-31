import { useSettings } from '@moneyboy/hooks/useSettings';
import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { useThemeSwitchStyles } from './ThemeSwitch.style';

export const ThemeSwitch: React.FC = () => {
  const { theme, useSystemTheme, set } = useSettings();

  const onModeChange = (useDarkMode: boolean) => {
    set('theme', useDarkMode ? 'dark' : 'light');
  };

  const onUseSystemChange = (useSystem: boolean) => {
    set('useSystemTheme', useSystem);
  };

  const styles = useThemeSwitchStyles();

  return (
    <>
      <View style={[styles.wrapper]}>
        <View style={[styles.container]}>
          <View style={[styles.labelContainer]}>
            <Text style={[styles.label]}>Use system theme?</Text>
          </View>
          <View style={[styles.switchContainer]}>
            <Switch value={useSystemTheme} onValueChange={onUseSystemChange} />
          </View>
        </View>
        <View style={[styles.container, styles.subLabelContainer]}>
          <View style={[styles.labelContainer]}>
            <Text style={[styles.label, useSystemTheme && styles.disabled]}>Dark theme?</Text>
          </View>
          <View style={[styles.switchContainer]}>
            <Switch value={theme === 'dark'} onValueChange={onModeChange} disabled={useSystemTheme} />
          </View>
        </View>
      </View>
    </>
  );
};
