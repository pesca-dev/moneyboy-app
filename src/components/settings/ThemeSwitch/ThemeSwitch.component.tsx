import { useSettings } from '@moneyboy/hooks/useSettings';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeSegmentedControlIOSChangeEvent, NativeSyntheticEvent, Text, View } from 'react-native';
import { useThemeSwitchStyles } from './ThemeSwitch.style';

export const ThemeSwitch: React.FC = () => {
  const { theme, set } = useSettings();

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    let index = 0;
    if (theme === 'light') {
      index = 1;
    } else if (theme === 'dark') {
      index = 2;
    }
    setTabIndex(index);
  }, [theme]);

  const onThemeSwitchChange = useCallback(
    ({ nativeEvent: { selectedSegmentIndex } }: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
      switch (selectedSegmentIndex) {
        case 0:
          set('theme', null);
          break;
        case 1:
          set('theme', 'light');
          break;
        case 2:
          set('theme', 'dark');
          break;
        default:
          set('theme', null);
      }
      setTabIndex(selectedSegmentIndex);
    },
    [set],
  );

  const styles = useThemeSwitchStyles();

  return (
    <>
      <View style={[styles.wrapper]}>
        <View style={[styles.container]}>
          <View style={[styles.labelContainer]}>
            <Text style={[styles.label]}>Theme</Text>
          </View>
          <View style={[styles.switchContainer]}>
            <SegmentedControl
              values={['System', 'Light', 'Dark']}
              selectedIndex={tabIndex}
              onChange={onThemeSwitchChange}
              fontStyle={{
                color: styles.label.color,
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};
