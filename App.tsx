import React from 'react';
import { StatusBar } from 'react-native';

import { AuthContextProvider } from '@context/AuthContext';
import AppContainer from '@views/AppContainer';
import { ParseContextProvider } from '@context/ParseContext';

declare const global: { HermesInternal: null | {} };

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ParseContextProvider>
        <AuthContextProvider>
          <AppContainer />
        </AuthContextProvider>
      </ParseContextProvider>
    </>
  );
}
