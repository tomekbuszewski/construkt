// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ICompanies } from "@construkt/contracts/company";
import { FetchState } from "../components/Content";

export enum APP_REDUCER_ACTIONS {
  SET_DATA = "SET_DATA",
  SET_FETCH_STATE = "SET_FETCH_STATE",
  SET_FILTER = "SET_FILTER",
  SET_SEARCH = "SET_SEARCH",
  SET_TEMP_SEARCH = "SET_TEMP_SEARCH",
  CLEAR_FILTERS = "CLEAR_FILTERS",
}

type SetDataAction = {
  type: APP_REDUCER_ACTIONS.SET_DATA;
  payload: ICompanies;
};

type SetFetchStateAction = {
  type: APP_REDUCER_ACTIONS.SET_FETCH_STATE;
  payload: FetchState;
};

type SetFilterAction = {
  type: APP_REDUCER_ACTIONS.SET_FILTER;
  payload: [string, string] | undefined;
};

type SetSearchAction = {
  type: APP_REDUCER_ACTIONS.SET_SEARCH;
  payload: string;
};

type SetTempSearchAction = {
  type: APP_REDUCER_ACTIONS.SET_TEMP_SEARCH;
  payload: string;
};

type ClearFiltersAction = {
  type: APP_REDUCER_ACTIONS.CLEAR_FILTERS;
};

type AppActions =
  | SetDataAction
  | SetFetchStateAction
  | SetFilterAction
  | SetSearchAction
  | SetTempSearchAction
  | ClearFiltersAction;

interface AppReducer {
  data: ICompanies;
  fetchState: FetchState;
  filter?: [string, string];
  search?: string;
  tempSearch: string;
}

export const defaultAppReducer: AppReducer = {
  data: [],
  fetchState: "UNKNOWN",
  tempSearch: "",
};

export function appReducer(state: AppReducer, action: AppActions): AppReducer {
  switch (action.type) {
    case APP_REDUCER_ACTIONS.SET_DATA: {
      return {
        ...state,
        data: action.payload,
        fetchState: "OK",
      };
    }

    case APP_REDUCER_ACTIONS.SET_SEARCH: {
      return {
        ...state,
        search: action.payload,
        filter: undefined,
      };
    }

    case APP_REDUCER_ACTIONS.SET_TEMP_SEARCH: {
      return {
        ...state,
        tempSearch: action.payload,
      };
    }

    case APP_REDUCER_ACTIONS.SET_FETCH_STATE: {
      if (action.payload === state.fetchState) {
        return state;
      }

      return {
        ...state,
        fetchState: action.payload,
      };
    }

    case APP_REDUCER_ACTIONS.SET_FILTER: {
      if (action.payload) {
        return {
          ...state,
          filter: action.payload,
          search: "",
          tempSearch: "",
        };
      }

      return {
        data: state.data,
        fetchState: state.fetchState,
        search: state.search,
        tempSearch: state.tempSearch,
      };
    }

    case APP_REDUCER_ACTIONS.CLEAR_FILTERS: {
      return {
        data: state.data,
        fetchState: state.fetchState,
        tempSearch: "",
      };
    }

    default: {
      return state;
    }
  }
}
