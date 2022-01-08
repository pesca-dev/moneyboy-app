import { ConfirmPaymentView } from '@moneyboy/components/extended/addPaymentButton/ConfirmPaymentView';
import { EnterPaymentView } from '@moneyboy/components/extended/addPaymentButton/EnterPaymentView';
import { SearchListView } from '@moneyboy/components/extended/addPaymentButton/SearchListView';
import { createPescaNavigation } from '@moneyboy/components/navigation/pesca-navigator/createPescaNavigation';
import React from 'react';

type AddPaymentButtonProps = {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
};

const Pesca = createPescaNavigation();

export const AddPaymentButton: React.FC<AddPaymentButtonProps> = ({ isOpen, setOpen }) => (
  <>
    <Pesca.Navigator isOpen={isOpen} setOpen={open => setOpen(open)} heading={'Add a payment'}>
      <Pesca.Screen name={'SeachListView'} component={SearchListView} />
      <Pesca.Screen name={'EnterPaymentView'} component={EnterPaymentView} />
      <Pesca.Screen name={'ConfirmPaymentView'} component={ConfirmPaymentView} />
    </Pesca.Navigator>
  </>
);
