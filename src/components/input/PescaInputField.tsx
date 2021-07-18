import variables from '@config/variables';
import { ThemeContext } from '@context/ThemeContext';
import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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
  keyboardType?: KeyboardTypeOptions;
  textContentType?: TextContentType;
};

export default function PescaInputField({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  onSubmitEditing,
  style,
  textContentType,
  keyboardType = 'default',
}: PescaInputFieldProps) {
  const theme = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 10,
    },
    label: {
      fontSize: variables.font.size.ultraSmall,
      marginBottom: 5,
      paddingLeft: 7,
      color: theme.input.label.color,
    },
    input: {
      // width: 200,
      borderColor: theme.input.borderColor,
      borderWidth: 1,
      padding: 10,
      fontSize: variables.font.size.small,
      borderRadius: 5,
    },
  });

  return (
    <View style={[styles.container]}>
      <Text style={[styles.label]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style]}
        placeholderTextColor={theme.input.placeholder}
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
}

export { PescaInputField };
