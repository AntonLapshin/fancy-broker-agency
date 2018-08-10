import { compose } from "recompose";
import calcMean from "./mean";

const calcSquareDiffs = ([values, mean]) =>
  values.map(value => Math.pow(value - mean, 2));

export default compose(
  Math.sqrt,
  calcMean,
  calcSquareDiffs,
  values => [values, calcMean(values)]
);
