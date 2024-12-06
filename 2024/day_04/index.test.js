import {
  checkForWord,
  DIAGONAL_DOWN_RIGHT_LINE,
  DIAGONAL_UP_LEFT_LINE,
  DIAGONAL_UP_RIGHT_LINE,
  findAllWordsInGraph,
  HORIZONTAL_LINE,
  HORIZONTAL_REVERSE_LINE,
  KEY_WORD_PART_TWO,
  LINES_PART_TWO,
  VERTICAL_LINE,
  VERTICAL_LINE_REVERSE,
  X_MAS_DOWN,
  X_MAS_FORWARD,
  X_MAS_UP,
} from ".";

const TEST_GRAPH = ["..X...", ".SAMX.", ".A..A.", "XMAS.S", ".X...."];
const TEST_GRAPH_3 = [
  "..X.....",
  ".SAMSX..",
  ".A.A....",
  "XMMS.S..",
  ".X......",
];

const TEST_GRAPH_2 = [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
];

const TEST_GRAPH_4 = [
  ".M.S......",
  "..A..MSMS.",
  ".M.S.MAA..",
  "..A.ASMSM.",
  ".M.S.M....",
  "..........",
  "S.S.S.S.S.",
  ".A.A.A.A..",
  "M.M.M.M.M.",
  "..........",
];

describe("checkForWord", () => {
  it.each([
    ["DIAG DOWN RIGHT", [0, 2], DIAGONAL_DOWN_RIGHT_LINE],
    ["HORIZONTAL", [3, 0], HORIZONTAL_LINE],
    ["HORIZONTAL REVERSE", [1, 4], HORIZONTAL_REVERSE_LINE],
    ["VERTICAL REVERSE", [4, 1], VERTICAL_LINE_REVERSE],
  ])(
    "should return true when finding a word with line %s at %s",
    (_, [x, y], line) => {
      expect(checkForWord(x, y, TEST_GRAPH, line)).toEqual(true);
    }
  );
  it.each([["DIAG UP RIGHT", [4, 1], DIAGONAL_UP_RIGHT_LINE]])(
    "should return true when finding a word with line %s at %s",
    (_, [x, y], line) => {
      console.log(line);
      expect(checkForWord(x, y, TEST_GRAPH_3, line)).toEqual(true);
    }
  );
  it.each([
    ["VERTICAL", [0, 4], DIAGONAL_DOWN_RIGHT_LINE],
    ["HORIZ", [0, 5], HORIZONTAL_LINE],
    ["HORIZ REVERSE", [1, 4], HORIZONTAL_REVERSE_LINE],
    ["VERTICAL", [3, 9], VERTICAL_LINE],
    ["HORI AGAIN", [4, 0], HORIZONTAL_LINE],
    ["HORI REVERSE AGAIN", [4, 6], HORIZONTAL_REVERSE_LINE],
    ["DIAG RIGHT UP", [5, 0], DIAGONAL_UP_RIGHT_LINE],
    ["DIAG LEFT UP", [5, 6], DIAGONAL_UP_LEFT_LINE],
    ["DIAG RIGHT UP AGAIN", [9, 1], DIAGONAL_UP_RIGHT_LINE],
    ["DIAG RIGHT UP AGAIN AGAIN", [9, 3], DIAGONAL_UP_RIGHT_LINE],
    ["HORI AGAIN", [9, 5], HORIZONTAL_LINE],
    ["REVERSE VERT", [9, 9], VERTICAL_LINE_REVERSE],
    ["DIAG LEFT UP", [9, 9], DIAGONAL_UP_LEFT_LINE],
  ])(
    "should return true when finding a word with line %s at %s",
    (_, [x, y], line) => {
      console.log(line);
      expect(checkForWord(x, y, TEST_GRAPH_2, line)).toEqual(true);
    }
  );
  it.each([
    ["X_MAS_REVERSE", [0, 1], X_MAS_DOWN],
    ["X_MAS_UP", [8, 0], X_MAS_UP],
    ["X_MAS_FORWARD", [1, 5], X_MAS_FORWARD],
  ])(
    "should return true when finding a word with line %s at %s",
    (_, [x, y], line) => {
      console.log(line);
      expect(checkForWord(x, y, TEST_GRAPH_4, line, KEY_WORD_PART_TWO)).toEqual(
        true
      );
    }
  );
});

describe("findAllWordsInGraph", () => {
  it("should return correct for test input", () => {
    // const foo = readTxtFile("./2024/day_04/test2.txt");
    // expect(foo).toEqual(TEST_GRAPH_2);
    expect(findAllWordsInGraph(TEST_GRAPH)).toEqual(4);
    expect(findAllWordsInGraph(TEST_GRAPH_2)).toEqual(18);
  });
  it("should return correct for test input", () => {
    expect(
      findAllWordsInGraph(TEST_GRAPH_4, "M", LINES_PART_TWO, KEY_WORD_PART_TWO)
    ).toEqual(9);
  });
});
