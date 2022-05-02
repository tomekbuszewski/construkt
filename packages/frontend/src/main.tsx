import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import App from "./app/App";
import { ThemeWrapper } from "./ui/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </StrictMode>,
);
