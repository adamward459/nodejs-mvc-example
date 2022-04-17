import randomANumberInARange from '../random-a-number-in-a-range';

describe(randomANumberInARange.name, () => {
  it('Should an error when min > max (min:10, max:1)', () => {
    try {
      randomANumberInARange(10, 1);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual('max must be greater than or equal to min');
    }
  });

  it('Should generate a number in a range [1,10]', () => {
    const num = randomANumberInARange(1, 10);
    expect(Number.isInteger(num)).toEqual(true);
    expect(num).toBeLessThanOrEqual(10);
    expect(num).toBeGreaterThanOrEqual(1);
  });
});
