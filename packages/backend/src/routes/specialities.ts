import { specialities } from "@construkt/mock-db";

export function getSpecialities(req, res) {
  return res.send(specialities);
}
