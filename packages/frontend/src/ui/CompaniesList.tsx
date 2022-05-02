import { VFC } from "react";
import { Company } from "./Company";
import { ICompanies } from "@construkt/contracts/company";
import styled from "styled-components";
import { FE_TEST_IDS } from "../test-ids";

const StyledCompaniesList = styled.ul`
  display: grid;
  gap: 1rem;

  @media (${(props) => props.theme.media.medium}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (${(props) => props.theme.media.large}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
`;

export interface IFilterActions {
  onCityClick?: (id: string) => void;
  onSpecClick?: (id: string) => void;
}

export interface CompaniesListProps extends IFilterActions {
  items: ICompanies;
}

export const CompaniesList: VFC<CompaniesListProps> = ({
  items,
  onSpecClick,
  onCityClick,
}) => (
  <StyledCompaniesList data-testid={FE_TEST_IDS.COMPANIES_WRAPPER}>
    {items.map((item) => (
      <Company
        {...item}
        key={item.id}
        onCityClick={onCityClick}
        onSpecClick={onSpecClick}
      />
    ))}
  </StyledCompaniesList>
);
