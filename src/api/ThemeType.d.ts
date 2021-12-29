/**
 * Global type for a theme.
 */
export type ThemeType = {
  input: {
    label: {
      color: string;
    };
    borderColor: string;
    placeholder: string;
  };
  signals: {
    success: string;
    error: string;
  };
  shadow: {
    default: {
      color: string;
    };
  };
  tab: {
    default: {
      color: string;
    };
    focus: {
      color: string;
      shadow: string;
    };
    disabled: {
      color: string;
    };
  };
  flyout: {
    heading: {
      color: string;
      fontSize: number;
    };
    background: string;
    shadow: string;
    icon: {
      color: string;
    };
  };
  footer: {
    background: string;
    shadow: string;
  };
  list: {
    header: {
      background: string;
      color: string;
      shadow: string;
    };
  };
  groups: {
    header: {
      color: string;
    };
    caption: {
      color: string;
    };
    memberList: {
      color: string;
    };
    flyout: {
      color: string;
    };
  };
};
