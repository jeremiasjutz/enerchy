export function linearInterpolation({
  number,
  inputRange: [inputMin, inputMax],
  outputRange: [outputMin, outputMax],
}: Mapping) {
  return (
    ((number - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
    outputMin
  );
}

export function logarithmicInterpolation({
  number,
  inputRange: [inputMin, inputMax],
  outputRange: [outputMin, outputMax],
}: Mapping) {
  const x =
    ((number - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) +
    outputMin;
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function bezierInterpolation(
  t: number,
  initial: number,
  p1: number,
  p2: number,
  final: number
) {
  return (
    (1 - t) * (1 - t) * (1 - t) * initial +
    3 * (1 - t) * (1 - t) * t * p1 +
    3 * (1 - t) * t * t * p2 +
    t * t * t * final
  );
}

interface Mapping {
  number: number;
  inputRange: [number, number];
  outputRange: [number, number];
}
