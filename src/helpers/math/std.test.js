import calcStd from "./std";

//
// Online service for checking the results
// https://www.calculator.net/standard-deviation-calculator.html
//

test("calc std properly", () => {
  expect(+calcStd([10,2,38,23,38,23,21,32,12,4,612]).toFixed(11)).toBe(170.51657053332);
});
