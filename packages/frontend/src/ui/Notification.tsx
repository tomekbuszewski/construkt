import styled, { css } from "styled-components";

interface NotificationProps {
  level?: "info" | "bug";
}

export const Notification = styled.div<NotificationProps>`
  padding: 2rem;
  border-radius: 1rem;
  font-size: 2rem;
  margin: 2rem 1rem;

  ${({ level }) => {
    switch (level) {
      case "bug": {
        return css`
          color: ${({ theme }) => theme.colors.textError};
          background: ${({ theme }) => theme.colors.backgroundError};
        `;
      }

      case "info":
      default: {
        return css`
          color: ${({ theme }) => theme.colors.textMain};
          background: ${({ theme }) => theme.colors.backgroundActive};
        `;
      }
    }
  }}
`;
