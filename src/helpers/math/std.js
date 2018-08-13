import { compose } from "recompose";
import calcMean from "./mean";

export const calcSquareDiffs = ([values, mean]) =>
  values.map(value => Math.pow(value - mean, 2));

export const prepareToCalcDiffs = values => [values, calcMean(values)];

export default compose(
  Math.sqrt,
  calcMean,
  calcSquareDiffs,
  prepareToCalcDiffs
);