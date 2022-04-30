import { isQueryAllowed } from "./isQueryAllowed";

describe("[Helpers] isQueryAllowed", () => {
  const testData = {
    one: "dummy",
    two: "dummy",
  };

  it("should return true if a single query is valid for given data", () => {
    expect(isQueryAllowed(["one"], testData)).toBeTruthy();
  });

  it("should return true if a multiple queries are valid for given data", () => {
    expect(isQueryAllowed(["one", "two"], testData)).toBeTruthy();
  });

  it("should return true for a special case", () => {
    expect(isQueryAllowed(["search"], testData, ["search"])).toBeTruthy();
  });

  it("should return false when query is not valid for given data", () => {
    expect(isQueryAllowed(["five"], testData)).toBeFalsy();
  });

  it("should return false if one of the query items is not valid for given data", () => {
    expect(isQueryAllowed(["one", "five"], testData)).toBeFalsy();
  });

  it("should return false and leave early when keywords are empty", () => {
    expect(isQueryAllowed([], testData)).toBeFalsy();
  });
});
