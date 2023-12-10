import {
  findNextValue,
  findNextValueForSequence,
  findSequenceDifference,
  findSumOfNextValues,
} from ".";

describe("findSequenceDifference", () => {
  it.each([
    [
      [0, 3, 6, 9, 12, 15],
      [
        [3, 3, 3, 3, 3],
        [0, 0, 0, 0],
      ],
    ],
    [
      [1, 3, 6, 10, 15, 21],
      [
        [2, 3, 4, 5, 6],
        [1, 1, 1, 1],
        [0, 0, 0],
      ],
    ],
  ])(
    "should get the sequence difference for %o",
    (inputSequence, differences) => {
      const actualDifference = findSequenceDifference(inputSequence);

      expect(actualDifference).toEqual(differences);
    }
  );
});

describe("findNextValue", () => {
  it.each([
    [
      [0, 0, 0, 0],
      [3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3],
    ],
    [
      [3, 3, 3, 3, 3, 3],
      [0, 3, 6, 9, 12, 15],
      [0, 3, 6, 9, 12, 15, 18],
    ],
  ])(
    "should get the next value",
    (differenceOne, differenceTwo, expectedNextValue) => {
      const nextValue = findNextValue(differenceOne, differenceTwo);

      expect(nextValue).toEqual(expectedNextValue);
    }
  );
});

describe("findNextValueForSequence", () => {
  it("should return correct value", () => {
    const sequences = [
      [0, 3, 6, 9, 12, 15],
      [3, 3, 3, 3, 3],
      [0, 0, 0, 0],
    ];
    const expectedNextValue = 18;

    const nextValue = findNextValueForSequence(sequences);

    expect(nextValue).toEqual(expectedNextValue);
  });
  it("should return correct value", () => {
    const sequences = [
      [1, 3, 6, 10, 15, 21],
      [2, 3, 4, 5, 6],
      [1, 1, 1, 1],
      [0, 0, 0],
    ];
    const expectedNextValue = 28;

    const nextValue = findNextValueForSequence(sequences);

    expect(nextValue).toEqual(expectedNextValue);
  });
  it("should return correct value", () => {
    const sequences = [
      [10, 13, 16, 21, 30, 45],
      [3, 3, 5, 9, 15],
      [0, 2, 4, 6],
      [2, 2, 2],
      [0, 0],
    ];
    const expectedNextValue = 68;

    const nextValue = findNextValueForSequence(sequences);

    expect(nextValue).toEqual(expectedNextValue);
  });
});

describe("findSumOfNextValues", () => {
  it("should return the correct value", () => {
    const lines = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];
    const expectedValue = 114;

    const summedValue = findSumOfNextValues(lines);

    expect(summedValue).toEqual(expectedValue);
  });
  it("should work for part 2", () => {
    const lines = ["15 12 9 6 3 0", "21 15 10 6 3 1", "45 30 21 16 13 10"];
    const expectedValue = 2;

    const summedValue = findSumOfNextValues(lines);

    expect(summedValue).toEqual(expectedValue);
  });
});
