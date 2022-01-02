import variables from '@config/variables';
import { StyleContext } from '@context/StyleContext';
import { formatAmount } from '@util/amountUtil';
import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

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

  const { Input, Texts } = useContext(StyleContext);
  const styles = StyleSheet.create({
    container: {
      //   flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
    label: {
      fontSize: variables.font.size.small,
      marginBottom: 5,
      paddingLeft: 7,
      color: Input.label.color,
    },
    input: {
      display: 'none',
    },
    text: {
      //   flexDirection: 'column',
      textAlign: 'center',
      fontSize: 100,
      color: Texts.colors.primary,
    },
  });
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
