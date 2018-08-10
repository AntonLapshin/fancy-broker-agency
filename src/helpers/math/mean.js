export default values =>
  values.reduce((sum, value) => sum + value, 0) / values.length;
