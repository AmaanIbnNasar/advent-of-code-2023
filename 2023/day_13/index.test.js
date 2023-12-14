import {
  calculateMirrorMetric,
  calculateSmudgeMirrorMetrics,
  checkMirrorReflection,
  checkRowReflection,
} from ".";
import { transpose2DArray } from "../../utils/utils";

describe("checkRowReflection", () => {
  it.each([
    ["#.##..##.".split(""), 4, true],
    ["#.##..##.".split(""), 0, false],
    ["##.......".split(""), 0, true],
  ])("should find the reflection in a row", (inputRow, index, expected) => {
    const actual = checkRowReflection(inputRow, index);

    expect(actual).toEqual(expected);
  });
});

describe("checkForReflection", () => {
  it("should look for the reflection at a certain column", () => {
    const input = [
      "#.##..##.".split(""),
      "..#.##.#.".split(""),
      "##......#".split(""),
      "##......#".split(""),
      "..#.##.#.".split(""),
      "..##..##.".split(""),
      "#.#.##.#.".split(""),
    ];
    const inputIndex = 1;

    const expected = false;
    const actual = checkMirrorReflection(input, inputIndex);

    expect(actual).toEqual(expected);
  });
  it("should look for the reflection at a certain column for horizontal", () => {
    const input = transpose2DArray([
      "#...##..#".split(""),
      "#....#..#".split(""),
      "..##..###".split(""),
      "#####.##.".split(""),
      "#####.##.".split(""),
      "..##..###".split(""),
      "#....#..#".split(""),
    ]);
    const inputIndex = 3;

    const expected = true;
    const actual = checkMirrorReflection(input, inputIndex);

    expect(actual).toEqual(expected);
  });
});

describe("calculateMirrorMetric", () => {
  it("should return correct value for mirror", () => {
    const input = [
      "#.##..##.".split(""),
      "..#.##.#.".split(""),
      "##......#".split(""),
      "##......#".split(""),
      "..#.##.#.".split(""),
      "..##..##.".split(""),
      "#.#.##.#.".split(""),
    ];

    const expectedSummary = 5;

    const actualSummary = calculateMirrorMetric(input);

    expect(actualSummary).toEqual(expectedSummary);
  });
  it("should return correct value for mirror with horizontal", () => {
    const input = [
      "#...##..#".split(""),
      "#....#..#".split(""),
      "..##..###".split(""),
      "#####.##.".split(""),
      "#####.##.".split(""),
      "..##..###".split(""),
      "#....#..#".split(""),
    ];

    const expectedSummary = 400;

    const actualSummary = calculateMirrorMetric(input);

    expect(actualSummary).toEqual(expectedSummary);
  });
});

describe("calculateSmudgeMirrorMetrics", () => {
  it("should find the smudge mirrors", () => {
    const input = [
      "#.##..##.".split(""),
      "..#.##.#.".split(""),
      "##......#".split(""),
      "##......#".split(""),
      "..#.##.#.".split(""),
      "..##..##.".split(""),
      "#.#.##.#.".split(""),
    ];

    const expected = 300;

    const actual = calculateSmudgeMirrorMetrics(input);
    expect(actual).toEqual(expected);
  });
});
