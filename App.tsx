import React from 'react';
import { StatusBar } from 'react-native';

import { AuthContextProvider } from '@context/AuthContext';
import AppContainer from '@views/AppContainer';
import { PescaContextProvider } from '@context/PescaContext';
import { ThemeContextProvider } from '@context/ThemeContext';

declare const global: { HermesInternal: null | {} };

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PescaContextProvider>
        <AuthContextProvider>
          <ThemeContextProvider>
            <AppContainer />
          </ThemeContextProvider>
        </AuthContextProvider>
      </PescaContextProvider>
    </>
  );
}
