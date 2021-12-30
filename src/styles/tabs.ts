import { createColors } from '@styles/colors';

type Tab = {
  color: string;
  shadow: string;
};

export const createTabStyles = () => {
  const colors = createColors();

  const defaultTab: Partial<Tab> = {
    color: colors.shades.mediumDark,
  };

  const focus: Tab = {
    color: colors.shades.dark,
    shadow: colors.shades.soft,
  };

  const disabled: Partial<Tab> = {
    color: colors.shades.light,
  };

  return {
    default: defaultTab,
    focus,
    disabled,
  };
};
