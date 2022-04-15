import { Flyout } from '@moneyboy/components/general/flyouts/Flyout';
import { FlyoutHeader } from '@moneyboy/components/general/flyouts/FlyoutHeader';
import { PescaAmountField } from '@moneyboy/components/general/input/PescaAmountField';
import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { MoneyDiff } from '@moneyboy/components/general/payments/MoneyDiff';
import { usePaymentListItemStyles } from '@moneyboy/components/general/payments/PaymentListItem/PaymentListItem.style';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { usePayments } from '@moneyboy/hooks/usePayments';
import { formatAmount, parseAmount } from '@moneyboy/services/util/amountUtil';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useRef, useState, VFC } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

export interface PaymentProps extends Pesca.PaymentInformation {
  last?: boolean;
  separatorStyle?: StyleProp<ViewStyle>;
}

export const PaymentListItem: VFC<PaymentProps> = ({ id, to, from, amount, date, last, separatorStyle }) => {
  const { user } = useAuth();
  const { updatePayment, deletePayment } = usePayments();
  const [open, setOpen] = useState(false);

  const fromUs = useRef(user?.id === from.id);
  const name = fromUs.current ? to.displayName : from.displayName;

  const relativeAmount = amount * (fromUs.current ? 1 : -1);

  const [value, setValue] = useState(formatAmount(relativeAmount));
  const [focus, setFocus] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(date));
  function onDateChange(_evt: unknown, newDate?: Date) {
    if (newDate) {
      setCurrentDate(newDate);
    }
  }

  const styles = usePaymentListItemStyles();

  const onPress = useCallback(() => {
    if (fromUs.current) {
      setOpen(true);
    }
  }, [fromUs]);

  const handleCreateButtonPress = useCallback(() => {
    const newAmount = parseAmount(value);
    if (newAmount > 0) {
      const payment: Pesca.PaymentUpdateDTO = {
        id,
        to: to.id,
        date: currentDate.getTime(),
        amount: newAmount,
      };
      updatePayment(payment);
      setOpen(false);
    }
  }, [currentDate, id, to, value, updatePayment]);

  const handleDeleteButtonPress = useCallback(() => {
    deletePayment(id);
    setOpen(false);
  }, [deletePayment, id]);

  return (
    <>
      <MoneyDiff
        id={id}
        amount={relativeAmount}
        name={name}
        onPress={onPress}
        separatorStyle={separatorStyle}
        last={last}
      />
      <Flyout close={() => setOpen(false)} isOpen={open}>
        <FlyoutHeader heading="Edit Payment" />
        <PescaAmountField
          value={value}
          label={`Adjust payment for ${to.displayName}`}
          setValue={setValue}
          setFocus={setFocus}
          focus={focus}
          initialValue={amount}
        />
        <View style={[styles.dateFieldContainer]}>
          <View style={[styles.dateFieldLabelContainer]}>
            <Text style={styles.dateFieldLabel}>Date: </Text>
          </View>
          <DateTimePicker
            value={currentDate}
            display="default"
            onChange={onDateChange}
            style={[styles.dateFieldInput]}
            maximumDate={new Date()}
          />
        </View>
        <View style={[styles.buttonContainer]}>
          <PescaButton
            onPress={handleCreateButtonPress}
            hitSlop={{ top: 0, right: 0, bottom: 0, left: 0 }}
            disabled={parseAmount(value) === 0}>
            <View style={[styles.submitButtonBackground, parseAmount(value) === 0 && styles.disabled]}>
              <Text style={[styles.buttonText]}>Update Payment</Text>
            </View>
          </PescaButton>
        </View>
        <View style={[styles.buttonContainer]}>
          <PescaButton onPress={handleDeleteButtonPress} hitSlop={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <View style={[styles.deleteButtonBackground]}>
              <Text style={[styles.buttonText]}>Delete Payment</Text>
            </View>
          </PescaButton>
        </View>
      </Flyout>
    </>
  );
};
