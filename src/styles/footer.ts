import { createContentStyles } from '@moneyboy/styles/content';
import { StylingProps } from '@moneyboy/styles/stylingProps';

export const createFooterStyles = (props?: StylingProps) => {
  const content = createContentStyles(props);
  return {
    background: content.background.bg3,
    shadow: content.shadows.color,
  };
};
