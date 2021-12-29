import { createColors } from '@styles/colors';

export const createButtonStyles = () => {
  const colors = createColors();

  return {
    primary: {
      color: colors.base.white,
      background: colors.base.primary,
    },
  };
};
