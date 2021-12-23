import { PescaButton } from '@components/input/PescaButton';
import { ScreenComponentProps } from '@components/navigation/pesca-navigator/pescaScreen';
import variables from '@config/variables';
import { ThemeContext } from '@context/ThemeContext';
import { formatAmount } from '@util/amountUtil';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type ConfirmPaymentViewParams = {
  item?: {
    id: string;
    name: string;
  };
  amount: number;
  date: Date;
};

export const ConfirmPaymentView: React.FC<ScreenComponentProps<ConfirmPaymentViewParams>> = ({
  navigation,
  params,
}) => {
  function confirm() {
    navigation.close();
  }

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
    label: {
      fontSize: variables.font.size.small,
      marginBottom: 5,
      paddingLeft: 7,
      color: theme.input.label.color,
    },
    amount: {
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
      backgroundColor: theme.buttons.default.background,
      padding: 5,
      borderRadius: 10,
    },
    submitButtonText: {
      textAlign: 'center',
      fontSize: 24,
      color: theme.buttons.default.color,
    },
    dateFieldContainer: {
      flexDirection: 'row',
    },
    dateFieldLabelContainer: {
      justifyContent: 'center',
    },
    dateFieldLabel: {
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
        <Text style={[styles.label]}>Confirm Payment for {params?.item?.name}</Text>
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
