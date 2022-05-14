import { createColors } from '@moneyboy/styles/colors';
import { createContentStyles } from '@moneyboy/styles/content';
import { createListStyles } from '@moneyboy/styles/list';
import { StylingProps } from '@moneyboy/styles/stylingProps';
import { createTextStyles } from '@moneyboy/styles/text';

export const createFlyoutStyles = (props?: StylingProps) => {
  const colors = createColors(props);
  const texts = createTextStyles(props);
  const contents = createContentStyles(props);
  const lists = createListStyles(props);

  const heading = {
    color: texts.colors.primary,
    fontSize: 24,
  };

  const background = contents.background.bg2;

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
    color: props?.mode === 'dark' ? colors.shades.mediumLight : colors.shades.mediumDark,
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
