import { PescaButton } from '@moneyboy/components/general/input/pescaButton';
import variables from '@moneyboy/config/variables';
import { StyleContext } from '@moneyboy/context/StyleContext';
import React, { PropsWithChildren, useContext } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type FlyoutProps = {
  isOpen: boolean;
  close(): void;
};

export const Flyout: React.FC<PropsWithChildren<FlyoutProps>> = ({ isOpen, children, close }) => {
  const { Flyouts } = useContext(StyleContext);
  const styles = StyleSheet.create({
    flyoutContainer: {
      backgroundColor: Flyouts.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 20,
      elevation: 5,
      shadowColor: Flyouts.shadow,
      shadowRadius: 10,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
      maxHeight: '80%',
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    closeButton: {
      zIndex: 9999,
    },
    closeIcon: {
      fontSize: variables.font.size.default,
      color: Flyouts.icon.color,
    },
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
  });

  return (
    <Modal
      isVisible={isOpen}
      style={styles.modal}
      swipeDirection={['down']}
      onSwipeComplete={close}
      onBackdropPress={close}
      onBackButtonPress={close}
      propagateSwipe
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={0.5}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.flyoutContainer]}>
        <SafeAreaView>
          {children}
          {/* Close Button */}
          <View style={[styles.closeButtonContainer]}>
            <PescaButton onPress={close} style={[styles.closeButton]}>
              <MaterialCommunityIcons name="close" style={[styles.closeIcon]} />
            </PescaButton>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};
