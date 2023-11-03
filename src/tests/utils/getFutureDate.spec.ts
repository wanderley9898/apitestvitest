import { expect, test } from "vitest";
import { getFutureDate } from "./getFutureDate";

test("returns a date 1 year in the future", () => {
  const year = new Date().getFullYear();
  const futureDate = year + 1;
  expect(getFutureDate(`${year}-01-01`).getFullYear()).toEqual(futureDate);
})