import calcMean from "./mean";

//
// Online service for checking the results
// https://ncalculators.com/statistics/mean-value-calculator.htm
//

test("calc mean value properly", () => {
    expect(calcMean([5,20,40,80,100,23,123,123,1423,123])).toBe(206);
});