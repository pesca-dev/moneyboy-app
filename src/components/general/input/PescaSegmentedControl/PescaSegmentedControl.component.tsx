import { useStorage } from '@moneyboy/hooks/useStorage';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import React, { VFC } from 'react';
import { NativeSegmentedControlIOSChangeEvent, NativeSyntheticEvent, useColorScheme } from 'react-native';
import { usePescaSegmentedControlStyles } from './PescaSegmentedControl.style';

export type PescaSegmentedControlProps = {
  /**
   * The labels for the control's segment buttons, in order.
   */
  values?: string[];
  /**
   * The index in props.values of the segment to be (pre)selected.
   */
  selectedIndex?: number;
  /**
   * Callback that is called when the user taps a segment;
   * passes the event as an argument
   */
  onChange?: (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => void;
};

export const PescaSegmentedControl: VFC<PescaSegmentedControlProps> = ({ values, selectedIndex, onChange }) => {
  const { label, tab } = usePescaSegmentedControlStyles();
  const [theme] = useStorage('theme');
  const systemTheme = useColorScheme();
  return (
    <SegmentedControl
      values={values}
      selectedIndex={selectedIndex}
      onChange={onChange}
      fontStyle={label}
      tabStyle={tab}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      appearance={theme ?? systemTheme!}
    />
  );
};
