export const createColors = () => {
  const palette = {
    turquoise: {
      light: '#1abc9c',
      dark: '#16a085',
    },
    green: {
      light: '#2ecc71',
      dark: '#27ae60',
    },
    yellow: {
      light: '#f1c40f',
      dark: '#27ae60',
    },
    orange: {
      light: '#e67e22',
      dark: '#d35400',
    },
    blue: {
      light: '#3498db',
      dark: '#2980b9',
    },
    red: {
      light: '#e74c3c',
      dark: '#c0392b',
    },
    purple: {
      light: '#9b59b6',
      dark: '#8e44ad',
    },
  };

  const shades = {
    white: '#fff',
    veryLight: '#ecf0f1',
    light: '#bdc3c7',
    mediumLight: '#95a5a6',
    mediumDark: '#7f8c8d',
    dark: '#34495e',
    veryDark: '#2c3e50',
    black: '#000',
    soft: '#42423d',
  };

  const base = {
    black: shades.black,
    white: shades.white,
    primary: palette.blue.light,
  };

  const status = {
    success: palette.green.light,
    error: palette.red.light,
  };

  return {
    base,
    shades,
    palette,
    status,
  };
};
