import { ThemeType as ThemeType } from '@api/ThemeType';
import React, { PropsWithChildren } from 'react';

type ThemeContextProviderProps = {};

const palette = {
  turquoise: {
    light: '#1abc9c',
    dark: '#16a085',
  },
  green: {
    light: '#2ecc71',
    dark: '#27ae60',
  },
  yellow: {
    light: '#f1c40f',
    dark: '#27ae60',
  },
  orange: {
    light: '#e67e22',
    dark: '#d35400',
  },
  blue: {
    light: '#3498db',
    dark: '#2980b9',
  },
  red: {
    light: '#e74c3c',
    dark: '#c0392b',
  },
  purple: {
    light: '#9b59b6',
    dark: '#8e44ad',
  },
  shades: {
    white: '#fff',
    veryLight: '#ecf0f1',
    light: '#bdc3c7',
    mediumLight: '#95a5a6',
    mediumDark: '#7f8c8d',
    dark: '#34495e',
    veryDark: '#2c3e50',
    black: '#000',
    soft: '#42423d',
  },
};

const defaultTheme: ThemeType = {
  default: {
    white: palette.shades.white,
    black: palette.shades.black,
  },
  content: {
    background: palette.shades.white,
    text: {
      color: palette.shades.black,
    },
    separator: {
      color: palette.shades.veryLight,
    },
  },
  buttons: {
    logout: {
      color: palette.red.light,
    },
    add: {
      color: palette.shades.white,
      background: palette.blue.light,
    },
    default: {
      color: palette.shades.white,
      background: palette.blue.light,
    },
    form: {
      color: palette.shades.white,
      invalid: {
        background: palette.shades.mediumLight,
      },
      valid: {
        background: palette.shades.veryDark,
      },
    },
  },
  input: {
    label: {
      color: palette.shades.dark,
    },
    borderColor: palette.shades.veryLight,
    placeholder: palette.shades.mediumDark,
  },
  signals: {
    success: palette.green.light,
    error: palette.red.light,
  },
  shadow: {
    default: {
      color: palette.shades.soft,
    },
  },
  tab: {
    default: {
      color: palette.shades.mediumDark,
    },
    focus: {
      color: palette.shades.dark,
      shadow: palette.shades.soft,
    },
    disabled: {
      color: palette.shades.light,
    },
  },
  flyout: {
    heading: {
      color: palette.shades.black,
      fontSize: 24,
    },
    background: palette.shades.white,
    shadow: palette.shades.soft,
    icon: {
      color: palette.shades.mediumDark,
    },
  },
  footer: {
    background: palette.shades.white,
    shadow: palette.shades.soft,
  },
  list: {
    header: {
      color: palette.shades.black,
      background: palette.shades.white,
      shadow: palette.shades.soft,
    },
  },
  groups: {
    header: {
      color: palette.shades.black,
    },
    caption: {
      color: palette.shades.mediumDark,
    },
    memberList: {
      color: palette.shades.black,
    },
    flyout: {
      color: palette.shades.black,
    },
  },
};

export const ThemeContext = React.createContext<ThemeType>(defaultTheme);

/**
 * @deprecated use StyleContext instread
 */
export const ThemeContextProvider: React.FC<PropsWithChildren<ThemeContextProviderProps>> = ({ children }) => {
  const style: ThemeType = defaultTheme;

  return <ThemeContext.Provider value={style}>{children}</ThemeContext.Provider>;
};
