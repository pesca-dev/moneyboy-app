import PescaAmountField, { defaultValue } from '@components/input/PescaAmountField';
import PescaButton from '@components/input/PescaButton';
import { createPescaNavigation } from '@components/navigation/pesca-navigator/createPescaNavigation';
import { ScreenComponentProps } from '@components/navigation/pesca-navigator/pescaScreen';
import { ThemeContext } from '@context/ThemeContext';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchListView } from './addPaymentButton/SearchListView';

type IconStyle = {
  fontSize: number;
  color: string;
};

type AddPaymentButtonProps = {
  onPress?(): void;
  iconStyle?: IconStyle;
};

const Pesca = createPescaNavigation();

export default function AddPaymentButton({ onPress, iconStyle }: AddPaymentButtonProps) {
  const [isOpen, setOpen] = useState(false);

  function onAddPaymentButtonPress() {
    setOpen(true);
    onPress?.();
  }

  const theme = useContext(ThemeContext);
  const styles = StyleSheet.create({
    addPaymentButton: {
      marginRight: 15,
      paddingRight: 15,
      borderColor: theme.buttons.add.color,
      borderRightWidth: 1,
    },
    flyoutHeading: {
      color: theme.flyout.heading.color,
      fontSize: theme.flyout.heading.fontSize,
      fontWeight: 'bold',
    },
  });

  return (
    <>
      <View style={[styles.addPaymentButton]}>
        <PescaButton onPress={onAddPaymentButtonPress}>
          <MaterialCommunityIcons name="credit-card-plus-outline" style={[iconStyle]} />
        </PescaButton>
      </View>
      <Pesca.Navigator isOpen={isOpen} setOpen={open => setOpen(open)} heading={'Add a payment'}>
        <Pesca.Screen name={'SeachListView'} component={SearchListView} />
        <Pesca.Screen name={'Second Screen'} component={SecondScreen} />
      </Pesca.Navigator>
    </>
  );
}

type SecondScreenParams = {
  item?: {
    id: string;
    name: string;
  };
};

function SecondScreen({ name, navigation, params }: ScreenComponentProps & SecondScreenParams) {
  const p: SecondScreenParams = params;

  const theme = useContext(ThemeContext);
  const styles = StyleSheet.create({
    backButtonContainer: {
      paddingTop: 5,
      paddingBottom: 20,
    },
    backButtonText: {
      color: theme.buttons.default.background,
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
        <View
          style={{
            width: '100%',
            minHeight: 300,
          }}>
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
          <View
            style={{
              width: '100%',
              marginTop: 20,
            }}>
            <PescaButton>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: theme.buttons.default.background,
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    color: theme.buttons.default.color,
                  }}>
                  Next
                </Text>
              </View>
            </PescaButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
