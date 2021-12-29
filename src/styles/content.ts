import { createColors } from '@styles/colors';

export const createContentStyles = () => {
  const colors = createColors();
  const separator = {
    color: colors.shades.veryLight,
  };

  // TODO lome: when introducing dark-mode, use several stages of content
  return {
    background: colors.base.white,
    separator,
  };
};
