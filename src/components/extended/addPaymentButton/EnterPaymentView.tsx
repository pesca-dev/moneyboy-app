import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import PescaAmountField, { defaultValue } from '../../input/PescaAmountField';
import PescaButton from '../../input/PescaButton';
import { ScreenComponentProps } from '../../navigation/pesca-navigator/pescaScreen';

type EnterPaymentViewParams = {
  item?: {
    id: string;
    name: string;
  };
};

export default function EnterPaymentView({ navigation, params }: ScreenComponentProps & EnterPaymentViewParams) {
  const p: EnterPaymentViewParams = params;

  const theme = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 30,
    },
    backButtonContainer: {
      paddingTop: 5,
      paddingBottom: 20,
    },
    backButtonText: {
      color: theme.buttons.default.background,
    },
    submitButtonContainer: {
      width: '100%',
      marginTop: 20,
    },
    submitButtonBackground: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: theme.buttons.default.background,
      padding: 5,
      borderRadius: 10,
    },
    submitButtonText: {
      textAlign: 'center',
      fontSize: 24,
      color: theme.buttons.default.color,
    },
  });

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [params]);

  const [amountFieldInFocus, setAmountFieldFocus] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setAmountFieldFocus(false)}>
        <View style={[styles.container]}>
          <View style={[styles.backButtonContainer]}>
            <PescaButton
              onPress={() => {
                setAmountFieldFocus(false);
                navigation.back();
              }}>
              <Text style={[styles.backButtonText]}>{'<'} Back</Text>
            </PescaButton>
          </View>

          <PescaAmountField
            label={`Payment for ${p?.item?.name}`}
            focus={amountFieldInFocus}
            setFocus={setAmountFieldFocus}
            value={value}
            setValue={setValue}
          />
          <View style={[styles.submitButtonContainer]}>
            <PescaButton>
              <View style={[styles.submitButtonBackground]}>
                <Text style={[styles.submitButtonText]}>Next</Text>
              </View>
            </PescaButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
