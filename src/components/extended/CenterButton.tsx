import { AddPaymentButton } from '@components/extended/AddPaymentButton';
import { createPescaMenu } from '@components/extended/pescaMenu/createPescaMenu';
import { FlyoutContext } from '@context/FlyoutContext';
import React, { useState } from 'react';
import { Text } from 'react-native';

type CenterButtonProps = {};

const PescaMenu = createPescaMenu();

export function CenterButton({}: CenterButtonProps) {
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
}
