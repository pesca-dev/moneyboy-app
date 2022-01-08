import { createContentStyles } from '@moneyboy/styles/content';
import { StylingProps } from '@moneyboy/styles/stylingProps';

export const createFooterStyles = (props?: StylingProps) => {
  const content = createContentStyles(props);
  return {
    background: content.background.dp12,
    shadow: content.shadows.color,
  };
};
