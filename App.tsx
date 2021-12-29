import { AuthContextProvider } from '@context/AuthContext';
import { PescaContextProvider } from '@context/PescaContext';
import { StyleContextProvider } from '@context/StyleContext';
import { ThemeContextProvider } from '@context/ThemeContext';
import { AppContainer } from '@views/AppContainer';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

declare const global: { HermesInternal: null | {} };

type AppProps = {};

export const App: React.FC<AppProps> = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <PescaContextProvider>
        <AuthContextProvider>
          <ThemeContextProvider>
            <StyleContextProvider>
              <AppContainer />
            </StyleContextProvider>
          </ThemeContextProvider>
        </AuthContextProvider>
      </PescaContextProvider>
    </SafeAreaProvider>
  );
};
