import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFlyoutStyles } from './Flyout.style';

type FlyoutProps = {
  isOpen: boolean;
  close(): void;
};

export const Flyout: React.FC<PropsWithChildren<FlyoutProps>> = ({ isOpen, children, close }) => {
  const styles = useFlyoutStyles();
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
