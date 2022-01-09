import { defaultValue, PescaAmountField } from '@moneyboy/components/general/input/PescaAmountField';
import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { ScreenComponentProps } from '@moneyboy/components/general/navigation/PescaNavigator/PescaScreen';
import { parseAmount } from '@moneyboy/services/util/amountUtil';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { ConfirmPaymentViewParams } from '../ConfirmPayment';
import { useEnterPaymentStyles } from './EnterPayment.style';

export type EnterPaymentViewParams = {
  item: Pesca.UserInformation;
};

export const EnterPaymentView: React.FC<ScreenComponentProps<EnterPaymentViewParams, ConfirmPaymentViewParams>> = ({
  navigation,
  params,
}) => {
  const styles = useEnterPaymentStyles();

  const [value, setValue] = useState(defaultValue);
  const [date, setDate] = useState(new Date());

  function onDateChange(evt: any, newDate?: Date) {
    if (newDate) {
      setDate(newDate);
    }
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
