import styled from "styled-components";

export const Button = styled.button`
  border-radius: 4rem;
  height: 4rem;
  line-height: 4rem;
  padding: 0 2rem;

  cursor: pointer;

  border: 0;
  background: ${({ theme }) => theme.colors.ctaBackground};
  color: ${({ theme }) => theme.colors.textMain};
`;
