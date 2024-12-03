import { fileURLToPath } from "url";

export const coordOffArray = (coord, array) => {
  return coord < 0 || coord > array.length - 1;
};

export const findNextPositions = (y, x, direction, array) => {
  let [newY, newX] = [y, x];
  if (direction == "RIGHT") {
    newX = x + 1;
  }
  if (direction == "LEFT") {
    newX = x - 1;
  }
  if (direction == "UP") {
    newY = y - 1;
  }
  if (direction == "DOWN") {
    newY = y + 1;
  }

  if (coordOffArray(newY, array) || coordOffArray(newX, array)) {
    return [];
  }

  if (
    array[newY][newX] == "|" &&
    (direction == "LEFT" || direction == "RIGHT")
  ) {
    return [
      [newY + 1, newX],
      [newY - 1, newX],
    ];
  }

  if (array[newY][newX] == "-" && (direction == "UP" || direction == "DOWN")) {
    return [
      [newY, newX + 1],
      [newY, newX - 1],
    ];
  }

  if (array[newY][newX] == "/" && direction == "RIGHT") {
    return [[newY - 1, newX]];
  }
  if (array[newY][newX] == "\\" && direction == "LEFT") {
    return [[newY - 1, newX]];
  }
  return [[newY, newX]];
};

export const findEnergizedTiles = (array) => {
  let foundPath = false;
  let breakCounter = 0;
  let lazerDirection = "RIGHT";
  const lazerPositions = [[0, -1]];
  let energizedTiles = 0;
  while (!foundPath) {
    let [currentY, currentX] = lazerPositions.pop();
    let [nextY, nextX] = findNextPositions(
      currentY,
      currentX,
      lazerDirection,
      array
    );
    if (nextY !== -99 && nextX !== -99) {
      lazerPositions.push([nextY, nextX]);
      energizedTiles++;
    }
    if (lazerPositions.length == 0) {
      foundPath = true;
    }
    breakCounter++;
    if (breakCounter > 1_000_000) break;
  }

  return energizedTiles;
};

export const main = () => {};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
