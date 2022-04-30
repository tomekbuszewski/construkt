import { searchInArray } from "./searchInArray";

describe("[Helpers] searchInArray", () => {
  it("should return truthy for string query", () => {
    expect(searchInArray("test", ["test", "any", "thing"])).toBeTruthy();
  });

  it("should return truthy for array query", () => {
    expect(searchInArray([{ id: "test" }], ["test"])).toBeTruthy();
  });

  it("should return falsy when no items match query", () => {
    expect(searchInArray("non-existent", ["test"])).toBeFalsy();
  });
});
