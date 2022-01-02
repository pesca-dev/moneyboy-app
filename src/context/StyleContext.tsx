import { createButtonStyles } from '@styles/buttons';
import { createColors } from '@styles/colors';
import { createContentStyles } from '@styles/content';
import { createFlyoutStyles } from '@styles/flyout';
import { createFooterStyles } from '@styles/footer';
import { createGroupStyles } from '@styles/group';
import { createInputStyles } from '@styles/input';
import { createListStyles } from '@styles/list';
import { StylingProps } from '@styles/stylingProps';
import { createTabStyles } from '@styles/tab';
import { createTextStyles } from '@styles/text';
import React, { PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';

export type StyleContextType = {
  Colors: ReturnType<typeof createColors>;
  Buttons: ReturnType<typeof createButtonStyles>;
  Texts: ReturnType<typeof createTextStyles>;
  Content: ReturnType<typeof createContentStyles>;
  Input: ReturnType<typeof createInputStyles>;
  Tabs: ReturnType<typeof createTabStyles>;
  Flyouts: ReturnType<typeof createFlyoutStyles>;
  Footers: ReturnType<typeof createFooterStyles>;
  Lists: ReturnType<typeof createListStyles>;
  Groups: ReturnType<typeof createGroupStyles>;
};

export const StyleContext = React.createContext<StyleContextType>({
  Colors: createColors(),
  Buttons: createButtonStyles(),
  Texts: createTextStyles(),
  Content: createContentStyles(),
  Input: createInputStyles(),
  Tabs: createTabStyles(),
  Flyouts: createFlyoutStyles(),
  Footers: createFooterStyles(),
  Lists: createListStyles(),
  Groups: createGroupStyles(),
});

type StyleContextProviderProps = unknown;

export const StyleContextProvider: React.FC<PropsWithChildren<StyleContextProviderProps>> = ({ children }) => {
  const mode = useColorScheme();
  const styleProps: StylingProps = {
    mode,
  };
  const value: StyleContextType = {
    Colors: createColors(styleProps),
    Buttons: createButtonStyles(styleProps),
    Texts: createTextStyles(styleProps),
    Content: createContentStyles(styleProps),
    Input: createInputStyles(styleProps),
    Tabs: createTabStyles(styleProps),
    Flyouts: createFlyoutStyles(styleProps),
    Footers: createFooterStyles(styleProps),
    Lists: createListStyles(styleProps),
    Groups: createGroupStyles(styleProps),
  };
  return <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;
};
