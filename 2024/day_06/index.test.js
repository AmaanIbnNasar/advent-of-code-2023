import {
  checkForCycle,
  countPositions,
  DOWN,
  findGuard,
  LEFT,
  moveGuard,
  RIGHT,
  testData,
  UP,
} from ".";

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
      {
        positions: [
          [6, 4],
          [5, 4],
          [4, 4],
          [3, 4],
          [2, 4],
          [1, 4],
        ],
        end: false,
      },
      UP,
    ],
    [
      "UP_POS->RIGHT",
      [1, 4],
      {
        positions: [
          [1, 4],
          [1, 5],
          [1, 6],
          [1, 7],
          [1, 8],
        ],
        end: false,
      },
      RIGHT,
    ],
    [
      "UP_RIGHT_POS->DOWN",
      [1, 8],
      {
        positions: [
          [1, 8],
          [2, 8],
          [3, 8],
          [4, 8],
          [5, 8],
          [6, 8],
        ],
        end: false,
      },
      DOWN,
    ],
    [
      "DOWN_RIGHT_POS->LEFT",
      [6, 8],
      {
        positions: [
          [6, 8],
          [6, 7],
          [6, 6],
          [6, 5],
          [6, 4],
          [6, 3],
          [6, 2],
        ],
        end: false,
      },
      LEFT,
    ],
    [
      "DOWN_LEFT_POS->UP",
      [6, 2],
      {
        positions: [
          [6, 2],
          [5, 2],
          [4, 2],
        ],
        end: false,
      },
      UP,
    ],
    [
      "MID_POS->RIGHT",
      [4, 2],
      {
        positions: [
          [4, 2],
          [4, 3],
          [4, 4],
          [4, 5],
          [4, 6],
        ],
        end: false,
      },
      RIGHT,
    ],
    [
      "BOT_RIGHT->DOWN",
      [7, 7],
      {
        positions: [
          [7, 7],
          [8, 7],
          [9, 7],
        ],
        end: true,
      },
      DOWN,
    ],
    ["TOP_LEFT->UP", [0, 0], { positions: [[0, 0]], end: true }, UP],
    ["TOP_RIGHT->RIGHT", [0, 9], { positions: [[0, 9]], end: true }, RIGHT],
    ["BOTTOM_RIGHT->DOWN", [9, 9], { positions: [[9, 9]], end: true }, DOWN],
    ["BOTTOM_LEFT->LEFT", [9, 0], { positions: [[9, 0]], end: true }, LEFT],
  ])(
    "should move the guard from %s",
    (_, startPos, expectedPositions, direction) => {
      console.log(testData[0].length);
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

describe("checkForCycle", () => {
  it.each([
    [
      "First Cycle - start pos",
      [
        "....#.....",
        ".........#",
        "..........",
        "..#.......",
        ".......#..",
        "..........",
        ".#.#^.....",
        "........#.",
        "#.........",
        "......#...",
      ],
      [6, 4],
      11,
      true,
    ],
    [
      "Second Cycle",
      [
        "....#.....",
        ".........#",
        "..........",
        "..#.......",
        ".......#..",
        "..........",
        ".#..^.....",
        "......#.#.",
        "#.........",
        "......#...",
      ],
      [6, 4],
      11,
      true,
    ],
    [
      "Third Cycle",
      [
        "....#.....",
        ".........#",
        "..........",
        "..#.......",
        ".......#..",
        "..........",
        ".#..^.....",
        ".......##.",
        "#.........",
        "......#...",
      ],
      [6, 4],
      11,
      true,
    ],
    [
      "None Cycle",
      [
        "....#.....",
        ".........#",
        "..........",
        "..#.......",
        ".......#..",
        "..........",
        ".#..^.....",
        "........#.",
        "#.........",
        "......#...",
      ],
      [6, 4],
      11,
      false,
    ],
  ])(
    "should return true for a cycle - %s",
    (_, graph, guardPosition, maxMoves, expected) => {
      expect(checkForCycle(graph, guardPosition, maxMoves)).toEqual(expected);
    }
  );
});
