import { SettingsContext } from '@moneyboy/contexts/settingsContext';
import { useStyle } from '@moneyboy/hooks/useStyle';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

export const ThemeSwitch: React.FC = () => {
  const { theme, useSystemTheme, set } = useContext(SettingsContext);
  const { Texts } = useStyle();

  const onModeChange = (useDarkMode: boolean) => {
    set('theme', useDarkMode ? 'dark' : 'light');
  };

  const onUseSystemChange = (useSystem: boolean) => {
    set('useSystemTheme', useSystem);
  };

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'column',
      flex: 1,
    },
    container: {
      flexDirection: 'row',
      flex: 1,
      marginVertical: 2,
    },
    labelContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    label: {
      color: Texts.colors.primary,
      fontSize: 16,
    },
    subLabelContainer: {
      paddingLeft: 20,
    },
    disabled: {
      color: Texts.colors.disabled,
    },
    switchContainer: {},
  });

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
