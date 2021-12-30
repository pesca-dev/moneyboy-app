import { createColors } from '@styles/colors';
import { StylingProps } from '@styles/stylingProps';

export const createTextStyles = (props?: StylingProps) => {
  const colors = createColors(props);

  return {
    colors: {
      primary: props?.mode === 'dark' ? colors.base.white : colors.base.black,
      secondary: props?.mode === 'dark' ? colors.base.black : colors.base.white,
    },
  };
};
