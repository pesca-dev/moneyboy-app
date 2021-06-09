import React, { PropsWithChildren } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PescaButton from '@components/input/PescaButton';
import variables from '@config/variables';
import { StyleContext } from '@context/StyleContext';

type FlyoutProps = {
  isOpen: boolean;
  close(): void;
};

export default function Flyout({ isOpen, children, close }: PropsWithChildren<FlyoutProps>) {
  // const flyout = React.useContext(FlyoutContext);

  const theme = React.useContext(StyleContext);
  const styles = StyleSheet.create({
    flyoutOutterContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      flexDirection: 'row',
    },
    backplane: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.4,
    },
    flyoutContainer: {
      backgroundColor: theme.flyout.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 20,
      elevation: 5,
      shadowColor: theme.flyout.shadow,
      shadowRadius: 10,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
    closeButton: {
      zIndex: 9999,
    },
    closeIcon: {
      fontSize: variables.font.size.default,
      color: theme.flyout.icon.color,
    },
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
    },
  });

  return (
    <Modal
      isVisible={isOpen}
      style={styles.modal}
      swipeDirection={['down']}
      onSwipeComplete={close}
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={0.5}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={[styles.backplane]} />
      </TouchableWithoutFeedback>
      <View style={[styles.flyoutContainer]}>
        <SafeAreaView>{children}</SafeAreaView>

        {/* Close Button */}
        <View style={[styles.closeButtonContainer]}>
          <PescaButton onPress={close} style={[styles.closeButton]}>
            <MaterialCommunityIcons name="close" style={[styles.closeIcon]} />
          </PescaButton>
        </View>
      </View>
    </Modal>
  );
}
