const palette = {
  black: "#090909",
  white: "#E5E5E5",
};

const breakpoints = {
  xs: "480px",
  sm: "768px",
  md: "1024px",
  lg: "1200px",
  xl: "1440px",
};

export const mediaQueries = {
  xs: `(max-width: ${breakpoints.xs})`,
  sm: `(max-width: ${breakpoints.sm})`,
  md: `(max-width: ${breakpoints.md})`,
  lg: `(max-width: ${breakpoints.lg})`,
  xl: `(max-width: ${breakpoints.xl})`,
};

export const theme = {
  colors: {
    black: palette.black,
    white: palette.white,

    background: palette.white,
    backgroundInverse: palette.black,

    text: palette.black,
    textInverse: palette.white,

    border: palette.black,
    borderInverse: palette.white,
  },

  fonts: {
    main: '"Cascadia Mono", monospace',
  },

  fontSizes: {
    small: "0.875rem",
    medium: "1rem",
    large: "1.25rem",
    xlarge: "1.5rem",
    xxlarge: "2rem",
  },

  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
    xlarge: "32px",
    xxlarge: "48px",
  },

  borderRadius: {
    none: "0px",
    small: "4px",
    medium: "6px",
    large: "12px",
    round: "50%",
  },

  breakpoints,
  mediaQueries,
};

export type Theme = typeof theme;
