import styled from "styled-components";

export const Header = styled.header`
  padding: 1rem;

  @media (${({ theme }) => theme.media.medium}) {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;

    input {
      margin-left: auto;
    }
  }
`;
