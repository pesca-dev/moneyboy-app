import { createColors } from '@styles/colors';

export const createContentStyles = () => {
  const colors = createColors();
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
