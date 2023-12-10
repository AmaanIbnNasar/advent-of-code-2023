import { lcm } from "mathjs";
import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";
export const createMap = (lines) => {
  const map = {};

  lines.forEach((line) => {
    const [start, left, right] = line.match(/([A-Z0-9]{3})/g);
    map[start] = { L: left, R: right };
  });
  return map;
};

export const findZZZ = (
  map,
  instructions,
  startNode = "AAA",
  part2 = false
) => {
  let found = false;
  let i = 0;
  let currentNode = startNode;
  while (!found) {
    let currentInstruction = instructions[i % instructions.length];
    currentNode = map[currentNode][currentInstruction];
    if (currentNode === "ZZZ") {
      found = true;
    }
    if (part2 && currentNode.endsWith("Z")) {
      found = true;
    }
    i++;
    if (i > 100000) {
      return -99;
    }
  }
  return i;
};

const main = () => {
  const lines = readTxtFile("./2023/day_8/input.txt");
  const map = createMap(lines.slice(2));
  const instructions = lines[0].split("");

  const steps = findZZZ(map, instructions);
  let startNodes = Object.keys(map)
    .filter((key) => key.endsWith("A"))
    .map((node) => findZZZ(map, instructions, node, true));
  const stepsPart2 = lcm(...startNodes);

  console.log(steps, stepsPart2);
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
