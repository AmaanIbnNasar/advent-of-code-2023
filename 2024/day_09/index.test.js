import { calculateChecksum, fillGaps, parseLine, repeatLetter } from ".";

describe("repeatLetter", () => {
  it("should return the letter repeated X times", () => {
    expect(repeatLetter("A", 5)).toEqual("AAAAA");
  });
});

describe("parseLine", () => {
  it.each([["12345", ["0", ".", ".", "111", ".", ".", ".", ".", "22222"]]])(
    "should parse the line correctly - %s as %s",
    (input, parsed) => {
      expect(parseLine(input)).toEqual(parsed);
    }
  );
});

describe("fillGaps", () => {
  it.each([
    [
      [0, ".", ".", 1, 1, 1, ".", ".", ".", ".", 2, 2, 2, 2, 2],
      [0, 2, 2, 1, 1, 1, 2, 2, 2],
    ],
    [
      [
        0,
        0,
        ".",
        ".",
        ".",
        1,
        1,
        1,
        ".",
        ".",
        ".",
        2,
        ".",
        ".",
        ".",
        3,
        3,
        3,
        ".",
        4,
        4,
        ".",
        5,
        5,
        5,
        5,
        ".",
        6,
        6,
        6,
        6,
        ".",
        7,
        7,
        7,
        ".",
        8,
        8,
        8,
        8,
        9,
        9,
      ],
      [
        0, 0, 9, 9, 8, 1, 1, 1, 8, 8, 8, 2, 7, 7, 7, 3, 3, 3, 6, 4, 4, 6, 5, 5,
        5, 5, 6, 6,
      ],
    ],
  ])("should fill the gaps for %s correctly - %s", (input, filled) => {
    expect(fillGaps(input)).toEqual(filled);
  });
});

describe("calculateChecksum", () => {
  it("should calculate correctly", () => {
    const input = [
      0, 0, 9, 9, 8, 1, 1, 1, 8, 8, 8, 2, 7, 7, 7, 3, 3, 3, 6, 4, 4, 6, 5, 5, 5,
      5, 6, 6,
    ];
    expect(calculateChecksum(input)).toEqual(1928);
  });
  it("should calculate correctly", () => {
    const input = [
      0, 0, 10, 9, 9, 1, 1, 1, 8, 8, 8, 2, 8, 7, 7, 3, 3, 3, 7, 4, 4, 6, 5, 5,
      5, 5, 6, 6, 6,
    ];
    expect(calculateChecksum(input)).toEqual(2132);
  });
});
