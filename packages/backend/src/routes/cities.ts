import { cities } from "@construkt/mock-db";
import { ICities } from "../../contracts/city";
import { GenericGet } from "../../types";

export const getCities: GenericGet<ICities> = (_, res) => res.send(cities);
