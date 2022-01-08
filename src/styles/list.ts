import { createContentStyles } from '@moneyboy/styles/content';
import { StylingProps } from '@moneyboy/styles/stylingProps';
import { createTextStyles } from '@moneyboy/styles/text';

export const createListStyles = (props?: StylingProps) => {
  const content = createContentStyles(props);
  const text = createTextStyles(props);

  const header = {
    color: text.colors.primary,
    background: content.background.dp01,
    shadow: content.shadows.color,
  };

  return {
    header,
  };
};
