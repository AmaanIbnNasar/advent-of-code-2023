import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";

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

export const drawGraph = (graph, guardPosition, endPositions = []) => {
  const newGraph = [];
  for (let x = 0; x < graph.length; x++) {
    const line = graph[x].split("").map((_, y) => {
      for (let [endX, endY] of endPositions) {
        if (x == endX && y == endY) {
          return "X";
        }
      }
      if (x == guardPosition[0] && y == guardPosition[1]) {
        return "^";
      } else {
        return graph[x][y];
      }
    });
    newGraph.push(line.join(""));
  }
  console.log(newGraph.join("\n"), "\n");
  return newGraph;
};

export const UP = [-1, 0];
export const DOWN = [1, 0];
export const RIGHT = [0, 1];
export const LEFT = [0, -1];
export const DIRECTIONS = [UP, RIGHT, DOWN, LEFT];

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
  let currentPosition = guardPosition;
  while (true) {
    let [newX, newY] = [
      currentPosition[0] + direction[0],
      currentPosition[1] + direction[1],
    ];
    if (
      newX >= graph.length ||
      newY >= graph[0].length ||
      newX < 0 ||
      newY < 0
    ) {
      return { positions, end: true };
    }
    if (graph[newX][newY] == "#") {
      return { positions, end: false };
    }
    currentPosition = [newX, newY];
    // drawingGraph = drawGraph(drawingGraph, currentPosition);
    positions.push(currentPosition);
  }
};

export const checkForCycle = (graph, guardPosition, maxMoves) => {
  drawingGraph = [...graph];
  let end = false;
  let currentPosition = guardPosition;
  let i = 0;
  const posSet = new Set();
  let positions = [];
  const endPositions = [];
  while (!end) {
    let direction = DIRECTIONS[i % 4];
    let newPositions = moveGuard(currentPosition, graph, direction);
    positions.push(...newPositions.positions);
    end = newPositions.end;
    currentPosition = positions[positions.length - 1];
    endPositions.push(currentPosition);
    i++;
    posSet.add(...positions.map((pos) => pos.join(",")));
    if (i > maxMoves) {
      return true;
    }
  }
  // console.log(endPositions, endPositions.length);
  // drawGraph(drawingGraph, [], endPositions);
  return false;
};

export const countPositions = (guardPosition, graph) => {
  let end = false;
  let currentPosition = guardPosition;
  let i = 0;
  let positions = [];
  const endPositions = [];
  while (!end) {
    let direction = DIRECTIONS[i % 4];
    let newPositions = moveGuard(currentPosition, graph, direction);
    positions.push(...newPositions.positions);
    end = newPositions.end;
    currentPosition = positions[positions.length - 1];
    endPositions.push(currentPosition);
    i++;
  }
  console.log(i);
  // console.log(endPositions, endPositions.length);
  // drawGraph(drawingGraph, [], endPositions);
  return new Set(positions.map((pos) => pos.join(","))).size;
};

export const main = () => {
  const graph = readTxtFile("./2024/day_06/input.txt");
  drawingGraph = [...graph];
  const guardPosition = findGuard(graph);
  const maxMoves = 141;
  const cycles = [];
  for (let x = 0; x < graph.length; x++) {
    for (let y = 0; y < graph[x].length; y++) {
      console.log(
        `${x + 1}/${graph.length}`,
        `${y + 1}/${graph[x].length}`,
        cycles.length
      );
      const newGraph = [...graph];
      newGraph[x] = newGraph[x]
        .split("")
        .map((_, i) => {
          if (i == y) {
            return "#";
          } else {
            return newGraph[x][i];
          }
        })
        .join("");
      // console.log(newGraph.join("\n"));
      if (checkForCycle(newGraph, guardPosition, 200)) {
        cycles.push(newGraph);
      }
    }
  }
  console.log("CYCLES LENGTH", cycles.length);
  console.log(countPositions(guardPosition, graph));
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
