import { ICompanies } from "@construkt/contracts/company";
import { FetchState } from "../components/Content";

export enum APP_REDUCER_ACTIONS {
  SET_DATA = "SET_DATA",
  SET_FETCH_STATE = "SET_FETCH_STATE",
  SET_FILTER = "SET_FILTER",
  SET_SEARCH = "SET_SEARCH",
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
type ClearFiltersAction = {
  type: APP_REDUCER_ACTIONS.CLEAR_FILTERS;
};
type AppActions =
  | SetDataAction
  | SetFetchStateAction
  | SetFilterAction
  | SetSearchAction
  | ClearFiltersAction;

interface AppReducer {
  data: ICompanies;
  fetchState: FetchState;
  filter?: [string, string];
  search?: string;
}

export const defaultAppReducer: AppReducer = {
  data: [],
  fetchState: "UNKNOWN",
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
        };
      }

      return {
        data: state.data,
        fetchState: state.fetchState,
        search: state.search,
      };
    }

    case APP_REDUCER_ACTIONS.CLEAR_FILTERS: {
      return {
        data: state.data,
        fetchState: state.fetchState,
      };
    }

    default: {
      return state;
    }
  }
}
