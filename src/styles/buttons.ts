import { createColors } from '@styles/colors';

type Button = {
  color: string;
  background: string;
};

type ButtonStyle = {
  active: Button;
  inactive: Button;
};

export const createButtonStyles = () => {
  const colors = createColors();

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

  const logout: Button = {
    color: colors.status.error,
    background: colors.base.white,
  };

  return {
    primary,
    secondary,
    special: {
      logout,
    },
  };
};