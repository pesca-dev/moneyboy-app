import { createColors } from '@styles/colors';

export const createInputStyles = () => {
  const colors = createColors();
  return {
    label: {
      color: colors.shades.dark,
    },
    border: {
      color: colors.shades.veryLight,
    },
    placeholder: {
      color: colors.shades.mediumDark,
    },
  };
};
