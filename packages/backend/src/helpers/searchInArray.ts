import { BasicQueryItem } from "../../types";

export function searchInArray(
  needle: string | BasicQueryItem[],
  haystack: string[],
) {
  if (Array.isArray(needle)) {
    return Boolean(needle.find((q) => haystack.includes(q.id)));
  }

  return haystack.includes(needle);
}
