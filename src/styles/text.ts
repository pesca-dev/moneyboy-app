import { createColors } from '@styles/colors';

export const createTextStyles = () => {
  const colors = createColors();

  return {
    colors: {
      primary: colors.base.black,
      secondary: colors.base.white,
    },
  };
};
