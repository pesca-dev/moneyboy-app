import React from 'react';
import { StatusBar } from 'react-native';

import { AuthContextProvider } from '@context/AuthContext';
import AppContainer from '@views/AppContainer';
import { PescaContextProvider } from '@context/PescaContext';
import { StyleContextProvider } from '@context/StyleContext';

declare const global: { HermesInternal: null | {} };

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PescaContextProvider>
        <AuthContextProvider>
          <StyleContextProvider>
            <AppContainer />
          </StyleContextProvider>
        </AuthContextProvider>
      </PescaContextProvider>
    </>
  );
}
