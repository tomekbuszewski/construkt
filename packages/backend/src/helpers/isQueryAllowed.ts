export function isQueryAllowed(
  keywords: string[],
  query: Record<string, unknown>,
  specialCases: string[] = [],
) {
  if ([...keywords, ...specialCases].length === 0) {
    return false;
  }

  return keywords.every((keyword) =>
    [...Object.keys(query), ...specialCases].includes(keyword),
  );
}
