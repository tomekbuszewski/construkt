import { searchByName } from "./searchByName";

describe("[Helpers] searchByName", () => {
  it("should return true when item matches the full query", () => {
    expect(searchByName("one", "one")).toBeTruthy();
  });

  it("should return true when item matches the query partially", () => {
    expect(searchByName("one-two-three", "two")).toBeTruthy();
  });

  it("should return false when item doesn't match the query at all", () => {
    expect(searchByName("two", "one")).toBeFalsy();
  });
});
