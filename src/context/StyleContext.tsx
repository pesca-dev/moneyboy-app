import { createButtonStyles } from '@styles/buttons';
import { createColors } from '@styles/colors';
import { createContentStyles } from '@styles/content';
import { createTextStyles } from '@styles/text';
import React, { PropsWithChildren } from 'react';

export type StyleContextType = {
  Colors: ReturnType<typeof createColors>;
  Buttons: ReturnType<typeof createButtonStyles>;
  Texts: ReturnType<typeof createTextStyles>;
  Content: ReturnType<typeof createContentStyles>;
};

export const StyleContext = React.createContext<StyleContextType>({
  Colors: createColors(),
  Buttons: createButtonStyles(),
  Texts: createTextStyles(),
  Content: createContentStyles(),
});

type StyleContextProviderProps = {};

export const StyleContextProvider: React.FC<PropsWithChildren<StyleContextProviderProps>> = ({ children }) => {
  const value: StyleContextType = {
    Colors: createColors(),
    Buttons: createButtonStyles(),
    Texts: createTextStyles(),
    Content: createContentStyles(),
  };
  return <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;
};
