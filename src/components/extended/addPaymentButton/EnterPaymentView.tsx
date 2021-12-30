import variables from '@config/variables';
import { StyleContext } from '@context/StyleContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { parseAmount } from '../../../util/amountUtil';
import { defaultValue, PescaAmountField } from '../../input/PescaAmountField';
import { PescaButton } from '../../input/PescaButton';
import { ScreenComponentProps } from '../../navigation/pesca-navigator/pescaScreen';
import { ConfirmPaymentViewParams } from './ConfirmPaymentView';

export type EnterPaymentViewParams = {
  item: Pesca.UserInformation;
};

export const EnterPaymentView: React.FC<ScreenComponentProps<EnterPaymentViewParams, ConfirmPaymentViewParams>> = ({
  navigation,
  params,
}) => {
  const { Buttons, Texts } = useContext(StyleContext);
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
      color: Buttons.special.back.color,
    },
    submitButtonContainer: {
      width: '100%',
      marginTop: 20,
    },
    submitButtonBackground: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: Buttons.primary.active.background,
      padding: 5,
      borderRadius: 10,
    },
    disabled: {
      backgroundColor: Buttons.primary.inactive.background,
    },
    submitButtonText: {
      textAlign: 'center',
      fontSize: 24,
      color: Buttons.primary.active.color,
    },
    dateFieldContainer: {
      flexDirection: 'row',
    },
    dateFieldLabelContainer: {
      justifyContent: 'center',
    },
    dateFieldLabel: {
      color: Texts.colors.primary,
      fontSize: variables.font.size.small,
      paddingHorizontal: 7,
    },
    dateFieldInput: {
      flex: 1,
    },
  });

  const [value, setValue] = useState(defaultValue);
  const [date, setDate] = useState(new Date());

  function onDateChange(evt: any, newDate?: Date) {
    newDate && setDate(newDate);
  }

  useEffect(() => {
    setValue(defaultValue);
  }, [params]);

  const [amountFieldInFocus, setAmountFieldFocus] = useState(false);

  function unfocusAmountField() {
    setAmountFieldFocus(false);
  }

  function handleSubmitButtonPress() {
    if (!params) {
      // TODO lome: error badge
      return;
    }
    const amount = parseAmount(value);
    if (amount > 0) {
      unfocusAmountField();
      navigation.next({
        ...params,
        amount,
        date,
      });
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={unfocusAmountField}>
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
            label={`Enter Payment for ${params?.item?.displayName}`}
            focus={amountFieldInFocus}
            setFocus={setAmountFieldFocus}
            value={value}
            setValue={setValue}
          />
          <View style={[styles.dateFieldContainer]}>
            <View style={[styles.dateFieldLabelContainer]}>
              <Text style={styles.dateFieldLabel}>Date: </Text>
            </View>
            <DateTimePicker
              value={date}
              display="default"
              onChange={onDateChange}
              style={[styles.dateFieldInput]}
              maximumDate={new Date()}
            />
          </View>
          <View style={[styles.submitButtonContainer]}>
            <PescaButton
              onPress={handleSubmitButtonPress}
              hitSlop={{ top: 0, right: 0, bottom: 0, left: 0 }}
              disabled={parseAmount(value) === 0}>
              <View style={[styles.submitButtonBackground, parseAmount(value) === 0 && styles.disabled]}>
                <Text style={[styles.submitButtonText]}>Next</Text>
              </View>
            </PescaButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
