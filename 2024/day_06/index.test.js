import { countPositions, findGuard, moveGuard, RIGHT, testData, UP } from ".";

describe("findGuard", () => {
  it("should return the position of the guard", () => {
    const expectedPosition = [6, 4];
    expect(findGuard(testData)).toEqual(expectedPosition);
  });
});

describe("moveGuard", () => {
  it.each([
    [
      "START_POS->UP",
      [6, 4],
      [
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
      ],
      UP,
    ],
    [
      "UP_POS->RIGHT",
      [1, 4],
      [
        [1, 4],
        [1, 5],
        [1, 6],
        [1, 7],
        [1, 8],
      ],
      RIGHT,
    ],
  ])(
    "should move the guard from %s",
    (_, startPos, expectedPositions, direction) => {
      expect(moveGuard(startPos, testData, direction)).toEqual(
        expectedPositions
      );
    }
  );
});

describe("countPositions", () => {
  it("should move the guard and count the number of steps", () => {
    const expectedPositions = 41;
    const guardPosition = [6, 4];
    expect(countPositions(guardPosition, testData)).toEqual(expectedPositions);
  });
});
