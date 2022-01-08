import { AddPaymentButton } from '@moneyboy/components/extended/AddPaymentButton';
import { createPescaMenu } from '@moneyboy/components/extended/pescaMenu/createPescaMenu';
import { FlyoutContext } from '@moneyboy/context/FlyoutContext';
import React, { useState } from 'react';
import { Text } from 'react-native';

type CenterButtonProps = unknown;

const PescaMenu = createPescaMenu();

export const CenterButton: React.FC<CenterButtonProps> = () => {
  const flyout = React.useContext(FlyoutContext);

  const [isPaymentButtonOpen, setPaymentButtonOpen] = useState<boolean>(false);

  function onAddGroupButtonPress() {
    flyout.setChildren(
      <>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
      </>,
      true,
    );
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
