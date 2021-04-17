import React from 'react';
import { StatusBar } from 'react-native';

import { AuthContextProvider } from '@context/LoginContext';
import AppContainer from '@views/AppContainer';

declare const global: { HermesInternal: null | {} };

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AuthContextProvider>
        <AppContainer />
      </AuthContextProvider>
    </>
  );
}
