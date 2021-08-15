import ConfirmPaymentView from '@components/extended/addPaymentButton/ConfirmPaymentView';
import EnterPaymentView from '@components/extended/addPaymentButton/EnterPaymentView';
import { SearchListView } from '@components/extended/addPaymentButton/SearchListView';
import PescaButton from '@components/input/PescaButton';
import { createPescaNavigation } from '@components/navigation/pesca-navigator/createPescaNavigation';
import { ThemeContext } from '@context/ThemeContext';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <Pesca.Screen name={'EnterPaymentView'} component={EnterPaymentView} />
        <Pesca.Screen name={'ConfirmPaymentView'} component={ConfirmPaymentView} />
      </Pesca.Navigator>
    </>
  );
}
