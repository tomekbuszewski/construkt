import * as express from "express";

import { cities, companies, specialities } from "@construkt/mock-db";

export const app = express();

const router = express.Router();

export enum ROUTES {
  API_MAIN = "/api",
  COMPANIES = "/companies",
  CITIES = "/cities",
  SPECIALITIES = "/specialities",
}

router.route(ROUTES.COMPANIES).get(({ query }, res) => {
  const parsedQuery = Object.entries(query);

  if (parsedQuery.length > 0) {
    const filteredData = companies.filter((item) => {
      return parsedQuery.every(([queryKey, queryValue]) => {
        if (Array.isArray(queryValue)) {
          const lookupQuery = item[queryKey];

          if (Array.isArray(lookupQuery)) {
            return lookupQuery.find((q) => queryValue.includes(q.id));
          }

          return queryValue.includes(lookupQuery);
        }

        if (queryKey === "search") {
          return item.name.includes(queryValue as string);
        }

        return item[queryKey].id === queryValue;
      });
    });

    return res.send(filteredData);
  }

  return res.send(companies);
});
router.route(ROUTES.CITIES).get((req, res) => res.send(cities));
router.route(ROUTES.SPECIALITIES).get((req, res) => res.send(specialities));

app.use(ROUTES.API_MAIN, router);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.BACKEND_PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/${ROUTES.API_MAIN}`);
  });
  server.on("error", console.error);
}
