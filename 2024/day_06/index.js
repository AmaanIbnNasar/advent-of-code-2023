import { fileURLToPath } from "url";
export const testData = [
  "....#.....",
  ".........#",
  "..........",
  "..#.......",
  ".......#..",
  "..........",
  ".#..^.....",
  "........#.",
  "#.........",
  "......#...",
];
let drawingGraph = [...testData];

export const drawGraph = (graph, guardPosition) => {
  const newGraph = [];
  for (let x = 0; x < graph.length; x++) {
    const line = graph[x].split("").map((position, y) => {
      if (x == guardPosition[0] && y == guardPosition[1]) {
        return "^";
      } else {
        return graph[x][y];
      }
    });
    newGraph.push(line.join(""));
  }
  console.log(newGraph.join("\n"));
  return newGraph;
};

export const UP = [-1, 0];
export const DOWN = [0, 1];
export const RIGHT = [0, 1];
export const LEFT = [-1, 0];

export const findGuard = (graph) => {
  for (let x = 0; x < graph.length; x++) {
    for (let y = 0; y < graph[x].length; y++) {
      if (graph[x][y] == "^") {
        return [x, y];
      }
    }
  }
};

export const moveGuard = (guardPosition, graph, direction) => {
  const positions = [guardPosition];
  let stopFound = false;
  let currentPosition = guardPosition;
  while (!stopFound) {
    let [newX, newY] = [
      currentPosition[0] + direction[0],
      currentPosition[1] + direction[1],
    ];
    if (graph[newX][newY] != ".") {
      stopFound = true;
      break;
    }
    currentPosition = [newX, newY];
    drawingGraph = drawGraph(drawingGraph, currentPosition);
    positions.push(currentPosition);
  }
  return positions;
};

export const countPositions = (guardPosition, graph) => {
  const [xStart, yStart] = guardPosition;
};

export const main = () => {};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
