import { createContentStyles } from '@styles/content';
import { StylingProps } from '@styles/stylingProps';
import { createTextStyles } from '@styles/text';

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
