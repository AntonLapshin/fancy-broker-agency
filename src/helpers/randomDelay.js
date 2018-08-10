/**
 * taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
const randomBetween = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export default fn => (...args) =>
  new Promise(resolve =>
    setTimeout(() => resolve(fn.apply(null, args)), randomBetween(1000, 5000))
  );
