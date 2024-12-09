import { fillGaps, parseLine, repeatLetter } from ".";

describe("repeatLetter", () => {
  it("should return the letter repeated X times", () => {
    expect(repeatLetter("A", 5)).toEqual("AAAAA");
  });
});

describe("parseLine", () => {
  it.each([["12345", ["0", "..", "111", "....", "22222"]]])(
    "should parse the line correctly - %s as %s",
    (input, parsed) => {
      expect(parseLine(input)).toEqual(parsed);
    }
  );
});

describe("fillGaps", () => {
  it.each([
    // [["0", "..", "111", "....", "22222"], "022111222"],
    [
      [
        "00",
        "...",
        "111",
        "...",
        "2",
        "...",
        "333",
        ".",
        "44",
        ".",
        "5555",
        ".",
        "6666",
        ".",
        "777",
        ".",
        "8888",
        "99",
      ],
      "0099811188827773336446555566",
    ],
  ])("should fill the gaps for %s correctly - %s", (input, filled) => {
    expect(fillGaps(input)).toEqual(filled);
  });
});
