import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { FC, ReactNode } from "react";

export const theme = {
  colors: {
    background: "#fafafa",
    activeBackground: "#d5f8f0",
    ctaBackground: "#b3eadd",
    fadedBackground: "#ddd",
    textMain: "#333",
    textSecondary: "#646464",
  },
  media: {
    medium: "min-width: 768px",
    large: "min-width: 1120px",
  },
};

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size: 8px;
    font-family: Helvetica, Arial, sans-serif;
  }
`;

export const ThemeWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
