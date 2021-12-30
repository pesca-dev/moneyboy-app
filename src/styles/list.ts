import { createContentStyles } from '@styles/content';
import { createTextStyles } from '@styles/text';

export const createListStyles = () => {
  const content = createContentStyles();
  const text = createTextStyles();

  const header = {
    color: text.colors.primary,
    background: content.background,
    shadow: content.shadows.color,
  };

  return {
    header,
  };
};
