import { AuthContextProvider } from '@context/AuthContext';
import { PescaContextProvider } from '@context/PescaContext';
import { ThemeContextProvider } from '@context/ThemeContext';
import { AppContainer } from '@views/AppContainer';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

declare const global: { HermesInternal: null | {} };

export function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <PescaContextProvider>
        <AuthContextProvider>
          <ThemeContextProvider>
            <AppContainer />
          </ThemeContextProvider>
        </AuthContextProvider>
      </PescaContextProvider>
    </SafeAreaProvider>
  );
}
