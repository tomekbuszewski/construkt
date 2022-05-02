import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ICompanies } from "@construkt/contracts/company";
import { CompaniesList, Loader, Wrapper } from "../ui";

import debounce from "lodash.debounce";
import { FE_TEST_IDS } from "@construct/frontend/fe-test-ids";

const createUrl = ({
  filter,
  search,
}: {
  filter?: [string, string];
  search?: string;
}) => {
  const baseUrl = process.env["NX_FRONTEND_API_HOST"] + "/companies";

  const filters = filter ? Object.fromEntries([filter]) : {};
  const params = new URLSearchParams({
    search: search || "",
    ...filters,
  });

  return baseUrl + "?" + params.toString();
};

type FetchState = "OK" | "FAIL" | "UNKNOWN";

export const App = () => {
  const [data, setData] = useState<ICompanies>([]);
  const [fetchState, setFetchState] = useState<FetchState>("UNKNOWN");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState<[string, string] | undefined>();

  useEffect(() => {
    (async () => {
      setFetchState("UNKNOWN");

      try {
        const url = createUrl({ search: searchValue, filter });

        const fetchedData = await fetch(url);
        setData(await fetchedData.json());
        setFetchState("OK");
      } catch {
        setFetchState("FAIL");
      }
    })();
  }, [searchValue, filter]);

  const _performSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    if (value.length >= 3) {
      setSearchValue(e.target.value);
    }
  };

  const performSearch = useCallback(debounce(_performSearch, 500), []);

  const setFilterValue =
    (filterKey: "city" | "specialities") => (id: string) => {
      setSearchValue("");
      setFilter([filterKey, id]);
    };

  const setCityFilter = setFilterValue("city");
  const setSpecFilter = setFilterValue("specialities");

  const disableFilter = () => {
    setFilter(undefined);
    setSearchValue("");
  };

  if (fetchState === "UNKNOWN") {
    return <Loader data-testid={FE_TEST_IDS.LOADER} />;
  }

  if (fetchState === "OK") {
    return (
      <Wrapper>
        <input
          onChange={performSearch}
          defaultValue={searchValue}
          data-testid={FE_TEST_IDS.SEARCH_INPUT}
        />
        {(filter || searchValue) && (
          <button onClick={disableFilter}>Clean filters</button>
        )}
        {data.length > 0 ? (
          <CompaniesList
            items={data}
            onCityClick={setCityFilter}
            onSpecClick={setSpecFilter}
          />
        ) : (
          <div>No results</div>
        )}
      </Wrapper>
    );
  }

  return <div>Sorry, there was an error</div>;
};

export default App;
