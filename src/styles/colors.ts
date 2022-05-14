import { StylingProps } from '@moneyboy/styles/stylingProps';

export const createColors = (_props?: StylingProps) => {
  const nordBase = {
    nord0: '#2E3440',
    nord1: '#3B4252',
    nord2: '#434C5E',
    nord3: '#4C566A',
    nord4: '#D8DEE9',
    nord5: '#E5E9F0',
    nord6: '#ECEFF4',
    nord7: '#8FBCBB',
    nord8: '#88C0D0',
    nord9: '#81A1C1',
    nord10: '#5E81AC',
    nord11: '#BF616A',
    nord12: '#D08770',
    nord13: '#EBCB8B',
    nord14: '#A3BE8C',
    nord15: '#B48EAD',
  };

  const nord = {
    polarNight: {
      nord0: nordBase.nord0,
      nord1: nordBase.nord1,
      nord2: nordBase.nord2,
      nord3: nordBase.nord3,
    },
    snowStorm: {
      nord4: nordBase.nord4,
      nord5: nordBase.nord5,
      nord6: nordBase.nord6,
    },
    frost: {
      nord7: nordBase.nord7,
      nord8: nordBase.nord8,
      nord9: nordBase.nord9,
      nord10: nordBase.nord10,
    },
    aurora: {
      nord11: nordBase.nord11,
      nord12: nordBase.nord12,
      nord13: nordBase.nord13,
      nord14: nordBase.nord14,
      nord15: nordBase.nord15,
    },
  };

  const shades = {
    white: '#ffffff',
    veryLight: nord.snowStorm.nord6,
    light: nord.snowStorm.nord5,
    mediumLight: nord.snowStorm.nord4,
    mediumDark: nord.polarNight.nord3,
    dark: nord.polarNight.nord2,
    veryDark: nord.polarNight.nord1,
    black: nord.polarNight.nord1,
    soft: '#42423d',
  };

  const base = {
    black: shades.black,
    white: shades.white,
    primary: nord.frost.nord9,
    secondary: nord.polarNight.nord1,
    inactive: shades.mediumLight,
  };

  const status = {
    success: nord.aurora.nord14,
    error: nord.aurora.nord11,
  };

  const dark = {
    background: {
      base: 0x121212,
    },
  };

  return {
    nord,
    base,
    status,
    shades,
    dark,
  };
};
