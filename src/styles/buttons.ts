import { createColors } from '@styles/colors';

export const createButtonStylings = () => {
  const colors = createColors();

  return {
    primary: {
      color: colors.base.white,
      background: colors.base.primary,
    },
  };
};
