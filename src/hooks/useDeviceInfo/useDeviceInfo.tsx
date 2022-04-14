import { NativeModules, Platform } from 'react-native';

export const useDeviceInfo = () => {
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return Object.freeze({
    locale,
  });
};
