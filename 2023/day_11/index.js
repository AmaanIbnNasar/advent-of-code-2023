import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";

export const getGalaxies = (input) => {
  const galaxies = [];
  input.forEach((line, i) => {
    return line.forEach((point, j) => {
      if (point == "#") {
        galaxies.push({ x: i, y: j });
      }
    });
  });
  return galaxies;
};

export const findEmptyRows = (input) => {
  const emptyRows = [];
  input.forEach((line, i) => {
    if (line.every((point) => point == ".")) {
      emptyRows.push(i);
    }
  });
  return emptyRows;
};

export const findEmptyColumns = (input) => {
  const transposedInput = input[0].map((_, colIndex) =>
    input.map((row) => row[colIndex])
  );

  return findEmptyRows(transposedInput);
};

export const moveGalaxies = (
  galaxies,
  emptyRows,
  emptyColumns,
  moveAmount = 1
) => {
  const newGalaxies = [];
  for (const [i, galaxy] of Object.entries(galaxies)) {
    const newGalaxy = { ...galaxy };
    for (const emptyRow of emptyRows) {
      if (galaxy.x > emptyRow) {
        newGalaxy.x += moveAmount;
      }
    }
    for (const emptyColumn of emptyColumns) {
      if (galaxy.y > emptyColumn) {
        newGalaxy.y += moveAmount;
      }
    }
    newGalaxies.push(newGalaxy);
  }
  return newGalaxies;
};

export const findSumOfShortestDistancesBetweenGalaxies = (galaxies) => {
  const shortestDistances = [];
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const { x: x1, y: y1 } = galaxies[i];
      const { x: x2, y: y2 } = galaxies[j];

      const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      shortestDistances.push(distance);
    }
  }
  return shortestDistances.reduce((a, b) => a + b);
};

export const main = () => {
  const lines = readTxtFile("./2023/day_11/input.txt");
  const linesMapped = lines.map((line) => line.split(""));
  const galaxies = getGalaxies(linesMapped);
  const emptyRows = findEmptyRows(linesMapped);
  const emptyColumns = findEmptyColumns(linesMapped);

  const newGalaxies = moveGalaxies([...galaxies], emptyRows, emptyColumns);
  const newGalaxiesPart2 = moveGalaxies(
    [...galaxies],
    emptyRows,
    emptyColumns,
    1000000 - 1
  );
  const shortestDistancesSum =
    findSumOfShortestDistancesBetweenGalaxies(newGalaxies);
  const shortestDistancesSumPart2 =
    findSumOfShortestDistancesBetweenGalaxies(newGalaxiesPart2);
  console.log(shortestDistancesSum);
  console.log(shortestDistancesSumPart2);
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
