import { ThemeWrapper } from "../ui/theme";
import { useEffect, useState } from "react";
import { ICompanies } from "@construkt/contracts/company";
import { CompaniesList, Loader, Wrapper } from "../ui";

export const App = () => {
  const [data, setData] = useState<ICompanies>();

  useEffect(() => {
    (async () => {
      const fetchedData = await fetch(
        process.env["NX_FRONTEND_API_HOST"] + "/companies",
      );
      setData(await fetchedData.json());
    })();
  }, []);

  return (
    <ThemeWrapper>
      <Wrapper>{data ? <CompaniesList items={data} /> : <Loader />}</Wrapper>
    </ThemeWrapper>
  );
};

export default App;
