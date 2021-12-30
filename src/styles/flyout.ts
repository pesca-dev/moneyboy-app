import { createColors } from '@styles/colors';
import { createContentStyles } from '@styles/content';
import { createListStyles } from '@styles/list';
import { StylingProps } from '@styles/stylingProps';
import { createTextStyles } from '@styles/text';

export const createFlyoutStyles = (props?: StylingProps) => {
  const colors = createColors(props);
  const texts = createTextStyles(props);
  const contents = createContentStyles(props);
  const lists = createListStyles(props);

  const heading = {
    color: texts.colors.primary,
    fontSize: 24,
  };

  const background = contents.background.dp16;

  const list = {
    header: {
      color: lists.header.color,
      background,
    },
  };

  const separator = {
    color: contents.separator.color,
  };

  const icon = {
    color: colors.shades.mediumDark,
  };

  return {
    heading,
    background,
    shadow: contents.shadows.color,
    separator,
    list,
    icon,
  };
};
