import { parseLine, parseLinePartTwo, processMultiplications } from ".";

describe("parseLine", () => {
  it("should correctly extract the correct multiplications", () => {
    const inputLine =
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

    const expectedMultiplications = [
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ];

    const actual = parseLine(inputLine);

    expect(actual).toEqual(expectedMultiplications);
  });
});
describe("parseLinePartTwo", () => {
  it("should correctly extract the correct multiplications", () => {
    const inputLine =
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))mul(9,0)";

    const expectedMultiplications = [
      [2, 4],
      [8, 5],
      [9, 0],
    ];

    const actual = parseLinePartTwo(inputLine);

    expect(actual).toEqual(expectedMultiplications);
  });
});

describe("processMultiplications", () => {
  it("should sum and execute the multiplications", () => {
    const inputMultiplications = [
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ];

    const expected = 161;

    const actual = processMultiplications(inputMultiplications);

    expect(actual).toEqual(expected);
  });
});
