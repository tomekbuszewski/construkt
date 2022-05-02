import { VFC } from "react";
import { ICompany } from "@construkt/contracts/company";
import styled from "styled-components";

const Pill = styled.span`
  border-radius: 3rem;
  font-size: 1.25rem;
  background: ${({ theme }) => theme.colors.activeBackground};
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
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

export const Company: VFC<ICompany> = ({ name, logo, specialities, city }) => (
  <CompanyWrapper>
    <div>
      <CompanyImage src={logo} alt={`Logo of ${name}`} title={name} />
    </div>
    <CompanyName>{name}</CompanyName>
    <CompanyDetail>
      Area: <Pill>{city.name}</Pill>
    </CompanyDetail>
    <CompanyDetail>
      Specialities:{" "}
      {specialities.map((spec) => (
        <Pill key={spec.id}>{spec.name}</Pill>
      ))}
    </CompanyDetail>
  </CompanyWrapper>
);
