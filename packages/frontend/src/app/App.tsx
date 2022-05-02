import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

import { ICompanies } from "@construkt/contracts/company";
import { Button, Header, Input, PageTitle, Wrapper } from "../ui";

import { FE_TEST_IDS } from "@construct/frontend/fe-test-ids";
import { createUrl } from "../helpers/createUrl";
import { Content, FetchState } from "../components/Content";

export const App = () => {
  const [data, setData] = useState<ICompanies>([]);
  const [fetchState, setFetchState] = useState<FetchState>("UNKNOWN");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState<[string, string] | undefined>();

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

  const clearAllFilters = () => {
    setFilter(undefined);
    setSearchValue("");
  };

  const searchAndFilterUrl = useMemo(() => {
    return createUrl({ search: searchValue, filter });
  }, [searchValue, filter]);

  useEffect(() => {
    (async () => {
      setFetchState("UNKNOWN");

      try {
        const fetchedData = await fetch(searchAndFilterUrl);

        setData(await fetchedData.json());
        setFetchState("OK");
      } catch (e) {
        if (process.env["NODE_ENV"] !== "production") {
          console.warn(e);
        }

        setFetchState("FAIL");
      }
    })();
  }, [searchAndFilterUrl]);

  return (
    <Wrapper>
      <Header>
        <PageTitle onClick={clearAllFilters}>
          {process.env["NX_FRONTEND_TITLE"]}
        </PageTitle>
        <Input
          placeholder="Search"
          onChange={performSearch}
          defaultValue={searchValue}
          data-testid={FE_TEST_IDS.SEARCH_INPUT}
        />
        {(filter || searchValue) && (
          <Button onClick={clearAllFilters}>Clean filters</Button>
        )}
      </Header>
      <Content
        fetchState={fetchState}
        items={data}
        onSpecClick={setSpecFilter}
        onCityClick={setCityFilter}
      />
    </Wrapper>
  );
};

export default App;
