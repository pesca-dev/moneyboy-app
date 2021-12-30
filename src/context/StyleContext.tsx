import { createButtonStyles } from '@styles/buttons';
import { createColors } from '@styles/colors';
import { createContentStyles } from '@styles/content';
import { createFlyoutStyles } from '@styles/flyout';
import { createInputStyles } from '@styles/input';
import { createTabStyles } from '@styles/tabs';
import { createTextStyles } from '@styles/text';
import React, { PropsWithChildren } from 'react';

export type StyleContextType = {
  Colors: ReturnType<typeof createColors>;
  Buttons: ReturnType<typeof createButtonStyles>;
  Texts: ReturnType<typeof createTextStyles>;
  Content: ReturnType<typeof createContentStyles>;
  Input: ReturnType<typeof createInputStyles>;
  Tabs: ReturnType<typeof createTabStyles>;
  Flyouts: ReturnType<typeof createFlyoutStyles>;
};

export const StyleContext = React.createContext<StyleContextType>({
  Colors: createColors(),
  Buttons: createButtonStyles(),
  Texts: createTextStyles(),
  Content: createContentStyles(),
  Input: createInputStyles(),
  Tabs: createTabStyles(),
  Flyouts: createFlyoutStyles(),
});

type StyleContextProviderProps = {};

export const StyleContextProvider: React.FC<PropsWithChildren<StyleContextProviderProps>> = ({ children }) => {
  const value: StyleContextType = {
    Colors: createColors(),
    Buttons: createButtonStyles(),
    Texts: createTextStyles(),
    Content: createContentStyles(),
    Input: createInputStyles(),
    Tabs: createTabStyles(),
    Flyouts: createFlyoutStyles(),
  };
  return <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;
};
