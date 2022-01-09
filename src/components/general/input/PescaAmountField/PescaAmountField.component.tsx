import { formatAmount } from '@moneyboy/services/util/amountUtil';
import React, { useEffect, useRef } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { usePescaAmountFieldStyles } from './PescaAmountField.style';

type PescaAmountFieldProps = {
  label?: string;
  unit?: string;
  focus: boolean;
  setFocus?: (focus: boolean) => void;
  initialValue?: number;
  value: string;
  setValue: (val: string) => void;
};

export const defaultValue = '0,00';

/**
 * Component for catching a
 */
export const PescaAmountField: React.FC<PescaAmountFieldProps> = ({
  unit = '€',
  label,
  focus,
  setFocus,
  value,
  setValue,
}) => {
  const floatRef = useRef(0);

  function extractNumbers(str: string) {
    return str.replace(/\D+/g, '');
  }

  function removeSeparatorsFromString(str: string) {
    return str.replace(/\./g, '').replace(/,/g, '.');
  }

  useEffect(() => {
    const parsed = parseFloat(removeSeparatorsFromString(value));
    if (!parsed) {
      setValue(defaultValue);
    }
  });

  function onChangeText(t: string) {
    const str = removeSeparatorsFromString(t);
    if (extractNumbers(t.substr(-1)).length !== 0) {
      const val = parseFloat(str !== '' ? str : '0');
      if (str.length < formatAmount(floatRef.current).length) {
        floatRef.current = val / 10;
      } else if (val < floatRef.current) {
        floatRef.current = val;
      } else if (val >= floatRef.current) {
        floatRef.current = val * 10;
      }
    }
    setValue(formatAmount(floatRef.current));
  }

  const styles = usePescaAmountFieldStyles();
  const ref = useRef<TextInput | null>(null);

  useEffect(() => {
    if (focus) {
      ref.current?.focus();
    } else {
      ref.current?.blur();
    }
  }, [focus]);

  return (
    <View style={[styles.container]}>
      <TextInput value={value} style={[styles.input]} keyboardType="number-pad" onChangeText={onChangeText} ref={ref} />
      <Text style={[styles.label]}>{label}</Text>
      <TouchableWithoutFeedback onPress={() => setFocus?.(true)}>
        <Text style={[styles.text]}>{`${value} ${unit}`}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
