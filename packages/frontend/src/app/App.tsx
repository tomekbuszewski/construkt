import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import debounce from "lodash.debounce";
import { Button, Header, Input, PageTitle, Wrapper } from "../ui";

import { FE_TEST_IDS } from "@construct/frontend/fe-test-ids";
import { createUrl } from "../helpers/createUrl";
import { Content } from "../components/Content";
import {
  APP_REDUCER_ACTIONS,
  appReducer,
  defaultAppReducer,
} from "./App.state";

export const App = () => {
  const [state, dispatch] = useReducer(appReducer, defaultAppReducer);

  const performSearchRaw = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    if (value.length >= 3) {
      dispatch({
        type: APP_REDUCER_ACTIONS.SET_SEARCH,
        payload: value,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const performSearch = useCallback(debounce(performSearchRaw, 500), []);

  const setFilterValue =
    (filterKey: "city" | "specialities") => (id: string) => {
      dispatch({
        type: APP_REDUCER_ACTIONS.SET_FILTER,
        payload: [filterKey, id],
      });
    };

  const setCityFilter = setFilterValue("city");
  const setSpecFilter = setFilterValue("specialities");

  const clearAllFilters = () => {
    dispatch({
      type: APP_REDUCER_ACTIONS.CLEAR_FILTERS,
    });
  };

  const searchAndFilterUrl = useMemo(() => {
    return createUrl({ search: state.search, filter: state.filter });
  }, [state.search, state.filter]);

  const fetchData = async (query: string) => {
    const fetchedData = await fetch(query);
    return await fetchedData.json();
  };

  useEffect(() => {
    (async () => {
      dispatch({
        type: APP_REDUCER_ACTIONS.SET_FETCH_STATE,
        payload: "UNKNOWN",
      });

      try {
        dispatch({
          type: APP_REDUCER_ACTIONS.SET_DATA,
          payload: await fetchData(searchAndFilterUrl),
        });
      } catch (e) {
        if (process.env["NODE_ENV"] !== "production") {
          console.warn(e);
        }

        dispatch({
          type: APP_REDUCER_ACTIONS.SET_FETCH_STATE,
          payload: "FAIL",
        });
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
          defaultValue={state.search}
          data-testid={FE_TEST_IDS.SEARCH_INPUT}
        />
        {(state.filter || state.search) && (
          <Button onClick={clearAllFilters}>Clean filters</Button>
        )}
      </Header>
      <Content
        fetchState={state.fetchState}
        items={state.data}
        onSpecClick={setSpecFilter}
        onCityClick={setCityFilter}
      />
    </Wrapper>
  );
};

export default App;
