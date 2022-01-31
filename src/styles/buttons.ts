import { createColors } from '@moneyboy/styles/colors';
import { StylingProps } from '@moneyboy/styles/stylingProps';

type Button = {
  color: string;
  background: string;
};

type ButtonStyle = {
  active: Button;
  inactive: Button;
};

export const createButtonStyles = (props?: StylingProps) => {
  const colors = createColors(props);

  const primary: ButtonStyle = {
    active: {
      color: colors.base.white,
      background: colors.base.primary,
    },
    inactive: {
      color: colors.base.white,
      background: colors.base.inactive,
    },
  };

  const secondary: ButtonStyle = {
    active: {
      color: colors.base.white,
      background: colors.base.secondary,
    },
    inactive: {
      color: colors.base.white,
      background: colors.base.inactive,
    },
  };

  const logout: Partial<Button> = {
    color: colors.status.error,
  };

  const back: Partial<Button> = {
    color: colors.base.primary,
  };

  return {
    primary,
    secondary,
    special: {
      logout,
      back,
    },
  };
};
