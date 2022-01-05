import { AuthContextProvider } from '@context/AuthContext';
import { PescaContextProvider } from '@context/PescaContext';
import { SettingsContextProvider } from '@context/SettingsContext';
import { StyleContextProvider } from '@context/StyleContext';
import { AppContainer } from '@views/AppContainer';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
declare const global: { HermesInternal: null | {} };

type AppProps = unknown;

export const App: React.FC<AppProps> = () => (
  <SafeAreaProvider>
    <StatusBar />
    <SettingsContextProvider>
      <PescaContextProvider>
        <AuthContextProvider>
          <StyleContextProvider>
            <AppContainer />
          </StyleContextProvider>
        </AuthContextProvider>
      </PescaContextProvider>
    </SettingsContextProvider>
  </SafeAreaProvider>
);
