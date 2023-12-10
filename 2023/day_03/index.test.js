import { findFullNumber, getPartNumbers, getSumOfPartNumbers } from ".";

describe("getSumOfPartNumbers", () => {
  it("should return the right number", () => {
    const lines = [
      "467..114..",
      "...*......",
      "..35..633.",
      "......#...",
      "617*......",
      ".....+.58.",
      "..592.....",
      "......755.",
      "...$.*....",
      ".664.598..",
    ];

    const expectedSum = 4361;

    const actual = getSumOfPartNumbers(lines);

    expect(actual).toEqual(expectedSum);
  });
});

describe("getPartNumbers", () => {
  it("should return a graph", () => {
    const inputLines = [
      ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."],
      [".", ".", ".", "*", ".", ".", ".", ".", ".", "."],
      [".", ".", "3", "5", ".", ".", "6", "3", "3", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      ["6", "1", "7", "*", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", "+", ".", "5", "8", "."],
      [".", ".", "5", "9", "2", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "7", "5", "5", "."],
      [".", ".", ".", "$", ".", "*", ".", ".", ".", "."],
      [".", "6", "6", "4", ".", "5", "9", "8", ".", "."],
    ];

    const partNumbers = [467, 35, 633, 617, 592, 755, 664, 598];

    const actual = getPartNumbers(inputLines);

    expect(new Set(actual)).toEqual(new Set(partNumbers));
  });
});

describe("findFullNumber", () => {
  it.each([
    [[".", ".", "3", "5", ".", ".", "6", "3", "3", "."], 3, 35],
    [[".", ".", "3", "5", ".", ".", "6", "3", "3", "."], 6, 633],
    [["6", "1", "7", "*", ".", ".", ".", ".", ".", "."], 2, 617],
    [[".", ".", "5", "9", "2", ".", ".", ".", ".", "."], 3, 592],
    [[".", ".", ".", ".", ".", "+", ".", "5", "8", "."], 8, 58],
    [[".", ".", ".", ".", ".", "+", ".", "5", "8", "."], 7, 58],
    [[".", "6", "6", "4", ".", "5", "9", "8", ".", "."], 5, 598],
  ])(
    "for line %o, starting at %d, should get %d",
    (line, numberIndex, expectedNumber) => {
      const actualNumber = findFullNumber(line, numberIndex);

      expect(actualNumber).toEqual(expectedNumber);
    }
  );
});
