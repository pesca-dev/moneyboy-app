import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { ScreenComponentProps } from '@moneyboy/components/general/navigation/PescaNavigator/PescaScreen';
import { usePayments } from '@moneyboy/hooks/usePayments';
import { formatAmount } from '@moneyboy/services/util/amountUtil';
import React from 'react';
import { Text, View } from 'react-native';
import { useConfirmPaymentStyles } from './ConfirmPayment.style';

export type ConfirmPaymentViewParams = {
  item: Pesca.UserInformation;
  amount: number;
  date: Date;
};

export const ConfirmPaymentView: React.FC<ScreenComponentProps<ConfirmPaymentViewParams>> = ({
  navigation,
  params,
}) => {
  const { createPayment } = usePayments();

  function confirm() {
    if (!params) {
      // TODO lome: error badge
      return;
    }

    const { item, amount, date } = params;
    const payment: Pesca.PaymentCreateDTO = {
      to: item?.id,
      amount,
      date: date.getTime(),
    };
    createPayment(payment);
    navigation.close();
  }

  const styles = useConfirmPaymentStyles();

  return (
    <View style={[styles.container]}>
      <View style={[styles.backButtonContainer]}>
        <PescaButton onPress={navigation.back}>
          <Text style={[styles.backButtonText]}>{'<'} Back</Text>
        </PescaButton>
      </View>
      <View>
        <Text style={[styles.label]}>Confirm Payment for {params?.item?.displayName}</Text>
      </View>
      <View>
        <Text style={[styles.amount]}>{formatAmount(params?.amount ?? 0)} €</Text>
      </View>
      <View style={[styles.dateFieldContainer]}>
        <View style={[styles.dateFieldLabelContainer]}>
          <Text style={[styles.dateFieldLabel]}>Date: {params?.date.toLocaleDateString('de-DE')}</Text>
        </View>
      </View>
      <View style={[styles.submitButtonContainer]}>
        <PescaButton onPress={confirm}>
          <View style={[styles.submitButtonBackground]}>
            <Text style={[styles.submitButtonText]}>Confirm</Text>
          </View>
        </PescaButton>
      </View>
    </View>
  );
};
