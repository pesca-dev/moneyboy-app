import { createPescaMenu } from '@moneyboy/components/general/menus/createPescaMenu';
import { AddPaymentButton } from '@moneyboy/components/general/navigation/AddPaymentButton';
import React, { useState } from 'react';

type CenterButtonProps = unknown;

const PescaMenu = createPescaMenu();

export const CenterButton: React.FC<CenterButtonProps> = () => {
  const [isPaymentButtonOpen, setPaymentButtonOpen] = useState<boolean>(false);

  function onAddGroupButtonPress() {
    //
  }

  return (
    <>
      <PescaMenu.Menu iconName="plus">
        <PescaMenu.Item iconName="credit-card-plus-outline" onPress={() => setPaymentButtonOpen(true)} />
        <PescaMenu.Item iconName="account-plus-outline" />
        <PescaMenu.Item iconName="calendar-plus" />
        <PescaMenu.Item iconName="account-multiple-plus-outline" onPress={onAddGroupButtonPress} />
      </PescaMenu.Menu>
      <AddPaymentButton isOpen={isPaymentButtonOpen} setOpen={setPaymentButtonOpen} />
    </>
  );
};
