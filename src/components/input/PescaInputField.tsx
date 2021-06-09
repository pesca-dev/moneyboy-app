import variables from '@config/variables';
import React from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type PescaInputFieldProps = {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  onSubmitEditing?: (e?: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  style?: StyleProp<TextStyle>;
};

export default function PescaInputField({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  onSubmitEditing,
  style,
}: PescaInputFieldProps) {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style]}
        placeholderTextColor={variables.themes.light.text.light}
        textContentType="password"
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: variables.font.size.ultraSmall,
    marginBottom: 5,
    paddingLeft: 7,
    color: variables.themes.light.text.primary,
  },
  input: {
    // width: 200,
    borderColor: '#ecf0f1',
    borderWidth: 1,
    padding: 10,
    fontSize: variables.font.size.small,
    borderRadius: 5,
  },
});
