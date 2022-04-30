import { IBasicEntity } from "./common";
import { ICity } from "./city";
import { ISpeciality } from "./speciality";

export interface ICompany extends IBasicEntity {
  logo: string;
  city: ICity;
  specialities: ISpeciality[];
}

export type ICompanies = ICompany[];
