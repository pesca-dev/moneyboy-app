import { createContentStyles } from '@styles/content';
import { StylingProps } from '@styles/stylingProps';

export const createFooterStyles = (props?: StylingProps) => {
  const content = createContentStyles(props);
  return {
    background: content.background.dp16,
    shadow: content.shadows.color,
  };
};
