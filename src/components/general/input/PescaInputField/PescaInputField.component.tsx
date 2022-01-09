import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { usePescaInputFieldStyles } from './PescaInputField.style';

type TextContentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode';

type PescaInputFieldProps = {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  onSubmitEditing?: (e?: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  style?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  textContentType?: TextContentType;
};

export const PescaInputField: React.FC<PescaInputFieldProps> = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  onSubmitEditing,
  style,
  labelStyle,
  textContentType,
  keyboardType = 'default',
}) => {
  const styles = usePescaInputFieldStyles();

  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style]}
        placeholderTextColor={styles.placeholder.color}
        textContentType={textContentType}
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
      />
    </View>
  );
};
