import { createColors } from '@styles/colors';
import { createTextStyles } from '@styles/text';

export const createGroupStyles = () => {
  const colors = createColors();
  const text = createTextStyles();

  const header = {
    color: text.colors.primary,
  };

  const caption = {
    color: colors.shades.mediumDark,
  };

  const memberList = {
    color: text.colors.primary,
  };

  return {
    header,
    caption,
    memberList,
  };
};
