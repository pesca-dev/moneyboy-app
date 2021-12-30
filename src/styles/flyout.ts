import { createColors } from '@styles/colors';
import { createContentStyles } from '@styles/content';
import { createTextStyles } from '@styles/text';

export const createFlyoutStyles = () => {
  const colors = createColors();
  const texts = createTextStyles();
  const contents = createContentStyles();

  const heading = {
    color: texts.colors.primary,
    fontSize: 24,
  };

  const icon = {
    color: colors.shades.mediumDark,
  };

  return {
    heading,
    background: contents.background,
    shadow: contents.shadows.color,
    icon,
  };
};
