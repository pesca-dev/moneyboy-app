import { createColors } from '@moneyboy/styles/colors';
import { StylingProps } from '@moneyboy/styles/stylingProps';

export const createTextStyles = (props?: StylingProps) => {
  const colors = createColors(props);

  return {
    colors: {
      primary: props?.mode === 'dark' ? colors.base.white : colors.base.black,
      secondary: props?.mode === 'dark' ? colors.base.black : colors.base.white,
      disabled: colors.base.inactive,
    },
  };
};
