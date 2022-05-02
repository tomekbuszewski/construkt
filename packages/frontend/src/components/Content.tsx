import { CompaniesList, CompaniesListProps } from "../ui/CompaniesList";
import { VFC } from "react";
import { Loader } from "../ui";
import { FE_TEST_IDS } from "@construct/frontend/fe-test-ids";

export type FetchState = "OK" | "FAIL" | "UNKNOWN";

interface ContentProps extends CompaniesListProps {
  fetchState: FetchState;
}

export const Content: VFC<ContentProps> = ({ fetchState, ...rest }) => {
  if (fetchState === "UNKNOWN") {
    return <Loader data-testid={FE_TEST_IDS.LOADER} />;
  }

  if (rest.items.length > 0) {
    return <CompaniesList {...rest} />;
  }

  return <div>No results</div>;
};
