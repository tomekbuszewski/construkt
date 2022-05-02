import styled from "styled-components";

export const Input = styled.input`
  border-radius: 4rem;
  height: 4rem;
  line-height: 4rem;
  padding: 0 2rem;

  border: 0.125rem solid ${({ theme }) => theme.colors.backgroundFaded};
`;
