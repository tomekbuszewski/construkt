import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { FC, ReactNode } from "react";

export const theme = {
  colors: {
    backgroundMain: "#fafafa",
    backgroundActive: "#d5f8f0",
    backgroundCta: "#b3eadd",
    backgroundFaded: "#ddd",
    backgroundError: "#e3cece",
    textMain: "#333",
    textSecondary: "#646464",
    textError: "#9d0b0b",
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
