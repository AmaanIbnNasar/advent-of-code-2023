import {
  findNextSpaces,
  findNextSpacesAfterXSteps,
  findNumberOfStepsForInput,
  findRockPositions,
} from ".";

const TEST_INPUT = [
  "...........".split(""),
  ".....###.#.".split(""),
  ".###.##..#.".split(""),
  "..#.#...#..".split(""),
  "....#.#....".split(""),
  ".##..S####.".split(""),
  ".##..#...#.".split(""),
  ".......##..".split(""),
  ".##.#.####.".split(""),
  ".##..##.##.".split(""),
  "...........".split(""),
];

describe("findNextSpaces", () => {
  it("should return the next correct spaces", () => {
    const startPosition = { y: 5, x: 5 };

    const expectedSpaces = [
      { y: 4, x: 5 },
      { y: 5, x: 4 },
    ];

    const actualSpaces = findNextSpaces(TEST_INPUT, startPosition);

    expect(actualSpaces).toEqual(expectedSpaces);
  });
});

describe("findSpacesAfterXSteps", () => {
  it("should return all correct spaces", () => {
    const startPosition = { y: 5, x: 5 };

    const expectedSpaces = [
      { y: 3, x: 5 },
      { y: 5, x: 5 },
      { y: 5, x: 3 },
      { y: 6, x: 4 },
    ];

    const actualSpaces = findNextSpacesAfterXSteps(
      TEST_INPUT,
      startPosition,
      2
    );

    expect(actualSpaces).toEqual(expectedSpaces);
  });
  it("should return all correct spaces after 3 steps", () => {
    const startPosition = { y: 5, x: 5 };

    const expectedSpaces = [
      { y: 3, x: 6 },
      { y: 4, x: 5 },
      { y: 5, x: 4 },
      { y: 4, x: 3 },
      { y: 6, x: 3 },
      { y: 7, x: 4 },
    ];

    const actualSpaces = findNextSpacesAfterXSteps(
      TEST_INPUT,
      startPosition,
      3
    );

    expect(actualSpaces).toEqual(expectedSpaces);
  });
  it("should return all correct spaces after 64 steps", () => {
    const startPosition = { y: 5, x: 5 };

    const numberOfSpaces = 16;

    const actualSpaces = findNextSpacesAfterXSteps(
      TEST_INPUT,
      startPosition,
      6
    );
    expect(actualSpaces.length).toEqual(numberOfSpaces);
  });
});

describe("findNumberOfStepsForInput", () => {
  it("should return the correct number of steps", () => {
    const numberOfSpaces = 16;
    const actualSpaces = findNumberOfStepsForInput(
      TEST_INPUT,
      { x: 5, y: 5 },
      6
    );

    expect(actualSpaces).toEqual(numberOfSpaces);
  });
});
