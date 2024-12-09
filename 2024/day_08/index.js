import { fileURLToPath } from "url";
export const calculateDistanceBetweenNodes = (node1, node2) => {
  console.log(node1, node2);
  const xDiff = node2[0] - node1[0];
  const yDiff = node2[1] - node1[1];
  return [xDiff, yDiff];
};
export const calculateAntiNodes = (nodes, grid) => {
  const antiNodes = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const firstNode = nodes[i];
      const secondNode = nodes[j];
      const distance = calculateDistanceBetweenNodes(firstNode, secondNode);
      const firstAntiNodeX = firstNode[0] - distance[0];
      const firstAntiNodeY = firstNode[1] - distance[1];

      const secondAntiNodeX = secondNode[0] + distance[0];
      const secondAntiNodeY = secondNode[1] + distance[1];
      if (
        firstAntiNodeX >= 0 &&
        firstAntiNodeX < grid[0] &&
        firstAntiNodeY >= 0 &&
        firstAntiNodeY < grid[1]
      ) {
        antiNodes.push([firstAntiNodeX, firstAntiNodeY]);
      }
      if (
        secondAntiNodeX >= 0 &&
        secondAntiNodeX < grid[0] &&
        secondAntiNodeY >= 0 &&
        secondAntiNodeY < grid[1]
      ) {
        antiNodes.push([secondAntiNodeX, secondAntiNodeY]);
      }
      console.log(
        "FIRST",
        firstNode,
        "SECOND",
        secondNode,
        "DIST",
        distance,
        [firstAntiNodeX, firstAntiNodeY],
        [secondAntiNodeX, secondAntiNodeY]
      );
    }
  }
  return antiNodes;
};

export const findAllAntiNodes = (nodesByFrequency, grid) => {
  const antiNodes = [];
  for (const nodes of Object.values(nodesByFrequency)) {
    antiNodes.push(...calculateAntiNodes(nodes, grid));
  }
  console.log(antiNodes);
  return antiNodes;
};
export const main = () => {};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
