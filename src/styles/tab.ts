import { createColors } from '@moneyboy/styles/colors';
import { StylingProps } from '@moneyboy/styles/stylingProps';

type Tab = {
  color: string;
  shadow: string;
};

type Disabled<T> = T & {
  opacity?: number;
};

export const createTabStyles = (props?: StylingProps) => {
  const colors = createColors(props);

  const defaultTab: Partial<Tab> = {
    color: props?.mode === 'dark' ? colors.shades.light : colors.shades.mediumDark,
  };

  const focus: Tab = {
    color: props?.mode === 'dark' ? colors.base.white : colors.shades.dark,
    shadow: props?.mode === 'dark' ? colors.shades.light : colors.shades.dark,
  };

  const disabled: Partial<Disabled<Tab>> = {
    color: props?.mode === 'dark' ? colors.shades.mediumLight : colors.shades.mediumDark,
    opacity: 0.4,
  };

  return {
    default: defaultTab,
    focus,
    disabled,
  };
};
