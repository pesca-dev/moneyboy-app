import { SettingsContext } from '@moneyboy/contexts/settingsContext';
import { createButtonStyles } from '@moneyboy/styles/buttons';
import { createColors } from '@moneyboy/styles/colors';
import { createContentStyles } from '@moneyboy/styles/content';
import { createFlyoutStyles } from '@moneyboy/styles/flyout';
import { createFooterStyles } from '@moneyboy/styles/footer';
import { createGroupStyles } from '@moneyboy/styles/group';
import { createInputStyles } from '@moneyboy/styles/input';
import { createListStyles } from '@moneyboy/styles/list';
import { StylingProps } from '@moneyboy/styles/stylingProps';
import { createTabStyles } from '@moneyboy/styles/tab';
import { createTextStyles } from '@moneyboy/styles/text';
import React, { PropsWithChildren, useContext } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

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
  const { useSystemTheme, theme } = useContext(SettingsContext);
  let scheme = theme;

  const systemScheme = useColorScheme();

  if (useSystemTheme) {
    scheme = systemScheme;
  }

  const styleProps: StylingProps = {
    mode: scheme as ColorSchemeName,
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
