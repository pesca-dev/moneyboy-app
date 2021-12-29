/**
 * Global type for a theme.
 */
export type ThemeType = {
  content: {
    background: string;
    text: {
      color: string;
    };
    separator: {
      color: string;
    };
  };
  buttons: {
    logout: {
      color: string;
    };
    add: {
      color: string;
      background: string;
    };
    default: {
      color: string;
      background: string;
    };
    form: {
      color: string;
      invalid: {
        background: string;
      };
      valid: {
        background: string;
      };
    };
  };
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
