/**
 * Randomize a number in range [min,max].
 * @param min
 * @param max
 * @returns
 */
export default function randomANumberInARange(min: number, max: number) {
  if (max < min) {
    throw new Error('max must be greater than or equal to min');
  }
  return Math.floor(Math.random() * (max - min)) + min;
}
