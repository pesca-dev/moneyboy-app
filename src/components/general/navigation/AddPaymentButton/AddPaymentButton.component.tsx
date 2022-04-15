import { createPescaNavigation } from '@moneyboy/components/general/navigation/PescaNavigator/createPescaNavigation';
import { ConfirmPaymentView } from '@moneyboy/screens/addPayments/ConfirmPayment';
import { EnterPaymentView } from '@moneyboy/screens/addPayments/EnterPayment';
import { SearchListView } from '@moneyboy/screens/addPayments/SearchList';
import React from 'react';

type AddPaymentButtonProps = {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
};

const Pesca = createPescaNavigation();

export const AddPaymentButton: React.FC<AddPaymentButtonProps> = ({ isOpen, setOpen }) => (
  <>
    <Pesca.Navigator isOpen={isOpen} setOpen={open => setOpen(open)} heading="Add a payment">
      <Pesca.Screen name={'SeachListView'} component={SearchListView} />
      <Pesca.Screen name={'EnterPaymentView'} component={EnterPaymentView} />
      <Pesca.Screen name={'ConfirmPaymentView'} component={ConfirmPaymentView} />
    </Pesca.Navigator>
  </>
);
