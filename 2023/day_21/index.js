import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";

export const validateSpace = (garden, position) => {
  const { y, x } = position;

  if (y < 0 || y > garden.length || x < 0 || x > garden[0].length) {
    return false;
  }

  if (garden[y][x] == "#") {
    return false;
  }
  return true;
};

export const findNextSpaces = (garden, startPosition) => {
  const { y, x } = startPosition;
  const up = { y: y - 1, x };
  const left = { y, x: x - 1 };
  const right = { y, x: x + 1 };
  const down = { y: y + 1, x };

  return [up, left, right, down].filter((position) =>
    validateSpace(garden, position)
  );
};

export const findSpacesForPositions = (garden, positions) => {
  const newSpaces = [];
  for (const position of positions) {
    const { y, x } = position;
    const up = { y: y - 1, x };
    const left = { y, x: x - 1 };
    const right = { y, x: x + 1 };
    const down = { y: y + 1, x };

    if (validateSpace(garden, up)) newSpaces.push(up);
    if (validateSpace(garden, left)) newSpaces.push(left);
    if (validateSpace(garden, right)) newSpaces.push(right);
    if (validateSpace(garden, down)) newSpaces.push(down);
  }
  return newSpaces;
};

export const findNextSpacesAfterXSteps = (garden, startPosition, steps) => {
  let spaces = [startPosition];
  let positionsToExplore = [startPosition];
  for (let i = 0; i < steps; i++) {
    const newPositionsToExplore = positionsToExplore;
    const newSpaces = findSpacesForPositions(garden, newPositionsToExplore);

    spaces = newSpaces;
    positionsToExplore = newSpaces;
  }
  let arePointsEqual = (point1, point2) =>
    point1.x === point2.x && point1.y === point2.y;

  let uniquePoints = spaces.filter((point, index, array) => {
    return array.findIndex((p) => arePointsEqual(p, point)) === index;
  });
  return uniquePoints;
};

export const findNumberOfStepsForInput = (garden, startPosition, steps) => {
  return findNextSpacesAfterXSteps(garden, startPosition, steps).length;
};

export const main = () => {
  const lines = readTxtFile("./2023/day_21/input.txt").map((row) =>
    row.split("")
  );
  let startPosition;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] == "S") {
        startPosition = { x: j, y: i };
        break;
      }
    }
  }
  console.log(findNumberOfStepsForInput(lines, startPosition, 64));
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
