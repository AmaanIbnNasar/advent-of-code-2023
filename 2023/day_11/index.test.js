import {
  findSumOfShortestDistancesBetweenGalaxies,
  findEmptyColumns,
  findEmptyRows,
  getGalaxies,
  moveGalaxies,
} from ".";

describe("getGalaxies", () => {
  it("should get the galaxies as an array", () => {
    const input = [
      [".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      [".", "#", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
      ["#", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    ];

    const expectedGalaxies = [
      { x: 0, y: 3 },
      { x: 1, y: 7 },
      { x: 2, y: 0 },
      { x: 4, y: 6 },
      { x: 5, y: 1 },
      { x: 6, y: 9 },
      { x: 8, y: 7 },
      { x: 9, y: 0 },
      { x: 9, y: 4 },
    ];
    const actualGalaxies = getGalaxies(input);

    expect(actualGalaxies).toEqual(expectedGalaxies);
  });
});

describe("findEmptyRows", () => {
  it("should find the rows that are all dots", () => {
    const input = [
      [".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      [".", "#", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
      ["#", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    ];

    const emptyRows = [3, 7];

    const actualEmptyRows = findEmptyRows(input);

    expect(actualEmptyRows).toEqual(emptyRows);
  });
});

describe("findEmptyColumns", () => {
  it("should return the columns that are all dots", () => {
    const input = [
      [".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      [".", "#", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
      ["#", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    ];

    const emptyColumns = [2, 5, 8];

    const actualEmptyColumns = findEmptyColumns(input);

    expect(actualEmptyColumns).toEqual(emptyColumns);
  });
});

describe("moveGalaxies", () => {
  it("should move galaxies by empty rows and columns", () => {
    const galaxies = [
      { x: 0, y: 3 },
      { x: 1, y: 7 },
      { x: 2, y: 0 },
      { x: 4, y: 6 },
      { x: 5, y: 1 },
      { x: 6, y: 9 },
      { x: 8, y: 7 },
      { x: 9, y: 0 },
      { x: 9, y: 4 },
    ];

    const emptyRows = [3, 7];
    const emptyColumns = [2, 5, 8];

    const newGalaxies = [
      { x: 0, y: 4 },
      { x: 1, y: 9 },
      { x: 2, y: 0 },
      { x: 5, y: 8 },
      { x: 6, y: 1 },
      { x: 7, y: 12 },
      { x: 10, y: 9 },
      { x: 11, y: 0 },
      { x: 11, y: 5 },
    ];

    const actualGalaxies = moveGalaxies(galaxies, emptyRows, emptyColumns);

    expect(actualGalaxies).toEqual(newGalaxies);
  });
});

describe("findSumOfShortesDistancesBetweenGalaxies", () => {
  it("should find the correct sum of distances", () => {
    const galaxies = [
      { x: 0, y: 4 },
      { x: 1, y: 9 },
      { x: 2, y: 0 },
      { x: 5, y: 8 },
      { x: 6, y: 1 },
      { x: 7, y: 12 },
      { x: 10, y: 9 },
      { x: 11, y: 0 },
      { x: 11, y: 5 },
    ];

    const sum = 374;

    const actualSum = findSumOfShortestDistancesBetweenGalaxies(galaxies);

    expect(actualSum).toEqual(sum);
  });
});
