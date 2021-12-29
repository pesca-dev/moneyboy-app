import { createButtonStyles } from '@styles/buttons';
import { createColors } from '@styles/colors';
import { createTextStyles } from '@styles/text';
import React, { PropsWithChildren } from 'react';

export type StyleContextType = {
  Colors: ReturnType<typeof createColors>;
  Buttons: ReturnType<typeof createButtonStyles>;
  Texts: ReturnType<typeof createTextStyles>;
};

export const StyleContext = React.createContext<StyleContextType>({
  Colors: createColors(),
  Buttons: createButtonStyles(),
  Texts: createTextStyles(),
});

type StyleContextProviderProps = {};

export const StyleContextProvider: React.FC<PropsWithChildren<StyleContextProviderProps>> = ({ children }) => {
  const value: StyleContextType = {
    Colors: createColors(),
    Buttons: createButtonStyles(),
    Texts: createTextStyles(),
  };
  return <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;
};
