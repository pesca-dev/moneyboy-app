export default {
  /**
   * Variables concerning fonts.
   */
  font: {
    /**
     * Font sizes.
     */
    size: {
      default: 24,
      ultraSmall: 12,
      extraSmall: 16,
      small: 20,
      medium: 24,
      large: 32,
    },
  },
  /**
   * Variables for several display things.
   */
  display: {
    placeholderTop: {
      height: 40,
    },
    footer: {
      height: 85,
    },
  },
  themes: {
    light: {
      text: {
        default: '#000',
        primary: '#34495e',
        secondary: '#2c3e50',
        light: '#7f8c8d',
        negative: '#fff',
        white: '#fff',
        black: '#000',
      },
      icon: {
        primary: {
          color: '#7f8c8d',
        },
        focus: {
          color: '#34495e',
        },
        disabled: {
          color: '#bdc3c7',
        },
      },
      background: {
        primary: '#fff',
      },
      shadow: {
        primary: '#42423d',
      },
      signals: {
        bad: '#e74c3c',
        good: '#2ecc71',
      },
    },
  },
};
