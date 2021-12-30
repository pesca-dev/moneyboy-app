import { createColors } from '@styles/colors';
import { StylingProps } from '@styles/stylingProps';
import { createTextStyles } from '@styles/text';

export const createGroupStyles = (props?: StylingProps) => {
  const colors = createColors(props);
  const text = createTextStyles(props);

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
