import { cities } from "@construkt/mock-db";

export function getCities(req, res) {
  return res.send(cities);
}
