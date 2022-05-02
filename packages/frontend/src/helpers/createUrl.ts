export const createUrl = ({
  filter,
  search,
}: {
  filter?: [string, string];
  search?: string;
}) => {
  const baseUrl = process.env["NX_FRONTEND_API_HOST"] + "/companies";

  const filters: Record<string, string> = filter
    ? Object.fromEntries([filter])
    : {};

  if (search) {
    filters["search"] = search;
  }
  const params = new URLSearchParams(filters);

  return baseUrl + "?" + params.toString();
};
