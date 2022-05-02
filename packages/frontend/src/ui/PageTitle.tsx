import styled from "styled-components";

export const PageTitle = styled.h1`
  font-size: 4rem;
  font-weight: bolder;
  margin: 1rem 0 2rem;
  color: ${({ theme }) => theme.colors.textMain};

  @media (${({ theme }) => theme.media.medium}) {
    margin-bottom: 0;
  }
`;
