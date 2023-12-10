import {
  getAllPoints,
  getOurWinningNumbers,
  getPointsForCard,
  parseOneLine,
} from ".";

describe("parseOneLine", () => {
  it("should return the winning numbers and actual numbers as arrays", () => {
    const inputLine = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
    const expected = {
      winning: [41, 48, 83, 86, 17],
      our: [83, 86, 6, 31, 17, 9, 48, 53],
    };

    const actual = parseOneLine(inputLine);

    expect(actual).toEqual(expected);
  });
});

describe("getOurWinningNumbers", () => {
  it("should return the right winning numbers", () => {
    const input = {
      winning: [41, 48, 83, 86, 17],
      our: [83, 86, 6, 31, 17, 9, 48, 53],
    };
    const expected = [48, 83, 17, 86];

    const actual = getOurWinningNumbers(input);

    expect(new Set(actual)).toEqual(new Set(expected));
  });
});

describe("getPointsForCard", () => {
  it("should return correct points for a card", () => {
    const input = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
    const expectedPoints = { points: 8, numbers: [83, 86, 17, 48] };

    const actual = getPointsForCard(input);

    expect(actual).toEqual(expectedPoints);
  });
});

describe("getAllPoints", () => {
  it("should return the correct points for input", () => {
    const lines = [
      "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
      "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
      "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
      "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
      "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
      "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
    ];
    const expectedPoints = 13;

    const actual = getAllPoints(lines);

    expect(actual.points).toEqual(expectedPoints);
  });
});
