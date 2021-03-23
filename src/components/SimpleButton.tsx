import React from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface SimpleButtonProps {
  title: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  disabled?: boolean;
}

export default function SimpleButton({
  title,
  onPress,
  disabled,
}: SimpleButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.5}>
      <Text style={styles.content}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 100,
    margin: 'auto',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
  },
  content: {
    fontSize: 20,
    color: '#fff',
  },
});
