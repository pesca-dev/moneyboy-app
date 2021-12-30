import { createColors } from '@styles/colors';
import { StylingProps } from '@styles/stylingProps';

export const createContentStyles = (props?: StylingProps) => {
  const colors = createColors(props);
  const separator = {
    color: colors.shades.veryLight,
  };

  const shadows = {
    color: colors.shades.soft,
  };

  // TODO lome: when introducing dark-mode, use several stages of content
  return {
    background: colors.base.white,
    separator,
    shadows,
  };
};
