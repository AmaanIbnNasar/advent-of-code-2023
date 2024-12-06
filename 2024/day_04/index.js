import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";

export const HORIZONTAL_LINE = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
];
export const HORIZONTAL_REVERSE_LINE = HORIZONTAL_LINE.map(([x, y]) => [x, -y]);

export const VERTICAL_LINE = HORIZONTAL_LINE.map(([x, y]) => [y, x]);
export const VERTICAL_LINE_REVERSE = VERTICAL_LINE.map(([x, y]) => [-x, y]);

export const DIAGONAL_DOWN_RIGHT_LINE = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
];
export const DIAGONAL_UP_LEFT_LINE = [
  [0, 0],
  [-1, -1],
  [-2, -2],
  [-3, -3],
];

export const DIAGONAL_DOWN_LEFT_LINE = [
  [0, 0],
  [1, -1],
  [2, -2],
  [3, -3],
];

export const DIAGONAL_UP_RIGHT_LINE = [
  [0, 0],
  [-1, 1],
  [-2, 2],
  [-3, 3],
];

export const X_MAS_FORWARD = [
  [0, 0],
  [0, 2],
  [1, 1],
  [2, 0],
  [2, 2],
];
export const X_MAS_BACKWARD = [
  [0, 0],
  [0, -2],
  [-1, -1],
  [-2, 0],
  [-2, -2],
];
export const X_MAS_DOWN = [
  [0, 0],
  [2, 0],
  [1, 1],
  [0, 2],
  [2, 2],
];
export const X_MAS_UP = [
  [0, 0],
  [0, 2],
  [-1, 1],
  [-2, 0],
  [-2, 2],
];

export const LINES_PART_TWO = [
  X_MAS_DOWN,
  X_MAS_FORWARD,
  X_MAS_UP,
  X_MAS_BACKWARD,
];

const LINES = [
  HORIZONTAL_LINE,
  HORIZONTAL_REVERSE_LINE,
  VERTICAL_LINE,
  VERTICAL_LINE_REVERSE,
  DIAGONAL_DOWN_LEFT_LINE,
  DIAGONAL_DOWN_RIGHT_LINE,
  DIAGONAL_UP_LEFT_LINE,
  DIAGONAL_UP_RIGHT_LINE,
];

export const KEY_WORD = "XMAS";
export const KEY_WORD_PART_TWO = "MMASS";

export const checkForWord = (x, y, graph, lineToCheck, keyWord = KEY_WORD) => {
  const positionsToCheck = lineToCheck.map(([offsetX, offsetY], i) => {
    return {
      pos: [x + offsetX, y + offsetY],
      letter: keyWord[i],
    };
  });

  return positionsToCheck.reduce((prev, { pos, letter }) => {
    const [x, y] = pos;
    if (x >= graph.length || y >= graph[0].length || x < 0 || y < 0) {
      return false;
    }
    return prev && graph[x][y] == letter;
  }, true);
};

export const findAllWordsInGraph = (
  graph,
  startingLetter = "X",
  lines = LINES,
  keyWord = KEY_WORD
) => {
  let words = 0;
  for (let x = 0; x < graph.length; x++) {
    for (let y = 0; y < graph[x].length; y++) {
      if (graph[x][y] == startingLetter) {
        for (const line of lines) {
          if (checkForWord(x, y, graph, line, keyWord)) {
            words++;
          }
        }
      }
    }
  }
  return words;
};

export const main = () => {
  const graph = readTxtFile("./2024/day_04/input.txt");
  console.log(findAllWordsInGraph(graph));
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
