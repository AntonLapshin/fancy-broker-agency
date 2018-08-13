import { calcSquareDiffs, prepareToCalcDiffs } from "./std";

test("calc square diffs properly", () => {
  const result = calcSquareDiffs([[1, 2, 3, 4, 5, 6, 7], 3]);
  expect(result).toEqual([4, 1, 0, 1, 4, 9, 16]);
});

test("prepareToCalcDiffs works properly", () => {
  const result = prepareToCalcDiffs([1, 2, 3, 4, 5]);
  expect(result).toEqual([[1, 2, 3, 4, 5], 3]);
});
