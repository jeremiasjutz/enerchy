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
  const x = linearInterpolation({
    number: number,
    inputRange: [inputMin, inputMax],
    outputRange: [0, 1],
  });

  return linearInterpolation({
    number: x === 1 ? 1 : 1 - Math.pow(2, -10 * x),
    inputRange: [0, 1],
    outputRange: [outputMin, outputMax],
  });
}

export function cubicInterpolation({
  number,
  inputRange: [inputMin, inputMax],
  outputRange: [outputMin, outputMax],
}: Mapping) {
  const x = linearInterpolation({
    number: number,
    inputRange: [inputMin, inputMax],
    outputRange: [0, 1],
  });

  return linearInterpolation({
    number: 1 - Math.pow(1 - x, 3),
    inputRange: [0, 1],
    outputRange: [outputMin, outputMax],
  });
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
