import { companies } from "@construkt/mock-db";
import { isQueryAllowed, searchByName, searchInArray } from "../helpers";
import { GenericGet } from "../../types";
import { ICompanies } from "../../contracts/company";

const searchKeyword = "search";

function parseQueryValue(input: string | unknown): string | unknown {
  if (typeof input === "string" && input.includes("[")) {
    return input.slice(1, -1).split(",");
  }

  return input;
}

export const getCompanies: GenericGet<ICompanies> = ({ query }, res) => {
  const parsedQuery = Object.entries(query);
  const queryAllowed = isQueryAllowed(Object.keys(query), companies[0], [
    searchKeyword,
  ]);

  if (parsedQuery.length > 0) {
    const filteredData = companies.filter((company) => {
      if (queryAllowed) {
        return parsedQuery.every(([queryKey, rawQueryValue]) => {
          const queryValue = parseQueryValue(rawQueryValue);
          const lookupSpace = company[queryKey];

          if (Array.isArray(queryValue)) {
            return searchInArray(lookupSpace, queryValue as string[]);
          }

          if (queryKey === searchKeyword) {
            return searchByName(company.name, queryValue as string);
          }

          if (Array.isArray(lookupSpace)) {
            return lookupSpace.find(({ id }) => id === queryValue);
          }

          return lookupSpace.id === queryValue;
        });
      }

      return res.status(409);
    });

    return res.send(filteredData);
  }

  return res.send(companies);
};
