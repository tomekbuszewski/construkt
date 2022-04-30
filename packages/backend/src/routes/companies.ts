import { isQueryAllowed } from "../helpers/isQueryAllowed";
import { companies } from "@construkt/mock-db";
import { searchInArray } from "../helpers/searchInArray";
import { searchByName } from "../helpers/searchByName";

const searchKeyword = "search";

function parseQueryValue(input: string | unknown): string | unknown {
  if (typeof input === "string" && input.includes("[")) {
    return input.slice(1, -1).split(",");
  }

  return input;
}

export function getCompanies(req, res) {
  const { query } = req;
  const parsedQuery = Object.entries(query);
  const queryAllowed = isQueryAllowed(Object.keys(query), companies[0], [
    searchKeyword,
  ]);

  if (parsedQuery.length > 0) {
    const filteredData = companies.filter((company) => {
      if (queryAllowed) {
        return parsedQuery.every(([queryKey, rawQueryValue]) => {
          const queryValue = parseQueryValue(rawQueryValue);

          if (Array.isArray(queryValue)) {
            return searchInArray(company[queryKey], queryValue as string[]);
          }

          if (queryKey === searchKeyword) {
            return searchByName(company.name, queryValue as string);
          }

          return company[queryKey].id === queryValue;
        });
      }

      return res.status(409);
    });

    return res.send(filteredData);
  }

  return res.send(companies);
}
