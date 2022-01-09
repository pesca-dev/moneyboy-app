import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { ScreenComponentProps } from '@moneyboy/components/general/navigation/PescaNavigator/PescaScreen';
import variables from '@moneyboy/config/variables';
import { PescaContext } from '@moneyboy/contexts/pescaContext';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { formatAmount } from '@moneyboy/services/util/amountUtil';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type ConfirmPaymentViewParams = {
  item: Pesca.UserInformation;
  amount: number;
  date: Date;
};

export const ConfirmPaymentView: React.FC<ScreenComponentProps<ConfirmPaymentViewParams>> = ({
  navigation,
  params,
}) => {
  const pesca = useContext(PescaContext);

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
    pesca?.createPayment(payment);
    navigation.close();
  }

  const { Buttons, Input, Texts } = useStyle();
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
    label: {
      fontSize: variables.font.size.small,
      marginBottom: 5,
      paddingLeft: 7,
      color: Input.label.color,
    },
    amount: {
      color: Texts.colors.primary,
      textAlign: 'center',
      fontSize: 100,
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
  });

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
