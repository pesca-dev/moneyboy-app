import { createColors } from '@styles/colors';
import { createContentStyles } from '@styles/content';
import { StylingProps } from '@styles/stylingProps';
import { createTextStyles } from '@styles/text';

export const createFlyoutStyles = (props?: StylingProps) => {
  const colors = createColors(props);
  const texts = createTextStyles(props);
  const contents = createContentStyles(props);

  const heading = {
    color: texts.colors.primary,
    fontSize: 24,
  };

  const icon = {
    color: colors.shades.mediumDark,
  };

  return {
    heading,
    background: contents.background.dp24,
    shadow: contents.shadows.color,
    icon,
  };
};
