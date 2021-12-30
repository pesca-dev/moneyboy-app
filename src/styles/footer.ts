import { createContentStyles } from '@styles/content';

export const createFooterStyles = () => {
  const content = createContentStyles();
  return {
    background: content.background,
    shadow: content.shadows.color,
  };
};
