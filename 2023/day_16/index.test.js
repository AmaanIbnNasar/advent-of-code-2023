import { findEnergizedTiles, findNextPositions } from ".";

const TEST_INPUT = [
  `.|...\\....`.split(""),
  `|.-.\\.....`.split(""),
  `.....|-...`.split(""),
  `........|.`.split(""),
  `..........`.split(""),
  `.........\\`.split(""),
  `..../.\\\\..`.split(""),
  `.-.-/..|..`.split(""),
  `.|....-|.\\`.split(""),
  `..//.|....`.split(""),
];

describe("findNextPosition", () => {
  it.each([
    // [0, 2, "RIGHT", [[0, 3]]],
    // [0, 9, "RIGHT", []],
    // [0, 1, "LEFT", [[0, 0]]],
    // [0, 0, "LEFT", []],
    // [1, 0, "UP", [[0, 0]]],
    // [0, 0, "UP", []],
    // [0, 0, "DOWN", [[1, 0]]],
    // [9, 0, "DOWN", []],
    // [
    //   1,
    //   1,
    //   "LEFT",
    //   [
    //     [0, 0],
    //     [2, 0],
    //   ],
    // ],
    // [
    //   6,
    //   1,
    //   "DOWN",
    //   [
    //     [7, 0],
    //     [7, 2],
    //   ],
    // ],
    [9, 1, "RIGHT", [[8, 2]]],
    [0, 6, "LEFT", [[-1, 5]]],
  ])("should return the next position %s", (y, x, direction, expected) => {
    const actualPositions = findNextPositions(y, x, direction, TEST_INPUT);

    expect(actualPositions.sort()).toEqual(expected.sort());
  });
});

describe("findEnergizedTiles", () => {
  it("should loop through an array and return the tiles", () => {
    const expectedTile = 46;

    const actualTiles = findEnergizedTiles(TEST_INPUT);

    expect(actualTiles).toEqual(expectedTile);
  });
});
