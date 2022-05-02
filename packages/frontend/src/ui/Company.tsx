import { VFC } from "react";
import { ICompany } from "@construkt/contracts/company";
import styled, { css } from "styled-components";
import { IFilterActions } from "./CompaniesList";

interface PillProps {
  clickable?: boolean;
}

const Pill = styled.span<PillProps>`
  border-radius: 3rem;
  font-size: 1.25rem;
  background: ${({ theme }) => theme.colors.activeBackground};
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;

const CompanyWrapper = styled.li`
  padding: 1rem 1rem 4rem;
  border-radius: 0.5rem;
`;

const CompanyImage = styled.img`
  border-radius: 0.5rem;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
`;

const CompanyName = styled.h2`
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0 1.5rem;
  border-bottom: 0.125rem solid ${({ theme }) => theme.colors.fadedBackground};
  padding-bottom: 1rem;
`;

const CompanyDetail = styled.p`
  font-size: 1.25rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};

  & + & {
    margin-top: 2rem;
  }
`;

interface CompanyProps extends ICompany, IFilterActions {}

export const Company: VFC<CompanyProps> = ({
  name,
  logo,
  specialities,
  city,
  onCityClick,
  onSpecClick,
}) => {
  return (
    <CompanyWrapper>
      <div>
        <CompanyImage src={logo} alt={`Logo of ${name}`} title={name} />
      </div>
      <CompanyName>{name}</CompanyName>
      <CompanyDetail>
        Area:{" "}
        <Pill
          clickable={Boolean(onCityClick)}
          data-city={city.id}
          onClick={() => onCityClick && onCityClick(city.id)}
        >
          {city.name}
        </Pill>
      </CompanyDetail>
      <CompanyDetail>
        Specialities:{" "}
        {specialities.map((spec) => (
          <Pill
            clickable={Boolean(onSpecClick)}
            data-spec={spec.id}
            key={spec.id}
            onClick={() => onSpecClick && onSpecClick(spec.id)}
          >
            {spec.name}
          </Pill>
        ))}
      </CompanyDetail>
    </CompanyWrapper>
  );
};
