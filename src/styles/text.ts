import { createColors } from '@styles/colors';
import { StylingProps } from '@styles/stylingProps';

export const createTextStyles = (props?: StylingProps) => {
  const colors = createColors(props);

  return {
    colors: {
      primary: colors.base.black,
      secondary: colors.base.white,
    },
  };
};
