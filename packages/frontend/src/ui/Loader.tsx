import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    opacity: 0.25;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.25;
  }
`;

export const Loader = styled.div`
  animation: ${pulse} 2s infinite;

  width: 10rem;
  height: 10rem;
  border-radius: 10rem;

  background: ${(props) => props.theme.colors.textMain};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
