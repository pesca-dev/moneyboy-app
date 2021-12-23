import { ConfirmPaymentView } from '@components/extended/addPaymentButton/ConfirmPaymentView';
import { EnterPaymentView } from '@components/extended/addPaymentButton/EnterPaymentView';
import { SearchListView } from '@components/extended/addPaymentButton/SearchListView';
import { createPescaNavigation } from '@components/navigation/pesca-navigator/createPescaNavigation';
import React from 'react';

type AddPaymentButtonProps = {
  isOpen: boolean;
  setOpen: (arg: boolean) => void;
};

const Pesca = createPescaNavigation();

export const AddPaymentButton: React.FC<AddPaymentButtonProps> = ({ isOpen, setOpen }) => {
  return (
    <>
      <Pesca.Navigator isOpen={isOpen} setOpen={open => setOpen(open)} heading={'Add a payment'}>
        <Pesca.Screen name={'SeachListView'} component={SearchListView} />
        <Pesca.Screen name={'EnterPaymentView'} component={EnterPaymentView} />
        <Pesca.Screen name={'ConfirmPaymentView'} component={ConfirmPaymentView} />
      </Pesca.Navigator>
    </>
  );
};
