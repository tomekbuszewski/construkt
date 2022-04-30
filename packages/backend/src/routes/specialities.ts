import { specialities } from "@construkt/mock-db";
import { GenericGet } from "../../types";
import { ISpecialities } from "../../contracts/speciality";

export const getSpecialities: GenericGet<ISpecialities> = (_, res) =>
  res.send(specialities);
