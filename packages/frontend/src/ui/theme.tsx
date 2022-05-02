import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { FC, ReactNode } from "react";

export const theme = {
  background: "#fafafa",
  textMain: "#333",
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