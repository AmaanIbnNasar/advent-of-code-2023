import {
  calculateAntiNodes,
  calculateDistanceBetweenNodes,
  findAllAntiNodes,
} from ".";

describe("calculateDistanceBetweenNodes", () => {
  it.each([
    [
      [2, 1],
      [3, 4],
      [5, 5],
    ],
  ])("should return %s for nodes - %s", (alignment, node1, node2) => {
    expect(calculateDistanceBetweenNodes(node1, node2)).toEqual(alignment);
  });
});

describe("calculateAntiNodes", () => {
  it("should return a list of all antinodes", () => {
    const nodes = [
      [3, 4],
      [5, 5],
      [4, 8],
    ];
    const expectedAntiNodes = [
      [1, 3],
      [7, 6],
      [2, 0],
      [6, 2],
    ];

    expect(calculateAntiNodes(nodes, [9, 9])).toEqual(expectedAntiNodes);
  });
});

describe("findAllAntiNodes", () => {
  it("should find all anti nodes for all frequencies", () => {
    const nodesByFrequency = {
      0: [
        [1, 8],
        [2, 5],
        [3, 7],
        [4, 4],
      ],
      ["A"]: [
        [5, 6],
        [8, 8],
        [9, 9],
      ],
    };

    const antiNodes = [
      [3, 2], //
      [5, 6], //
      [7, 0], //
      [1, 3], //
      [4, 9], //
      [0, 6], //
      [6, 3], //
      [2, 10], //
      [5, 1], //
      [2, 4], //
      //[1, 3],
      [7, 7], //
      [10, 10], //
      [0, 11],
      [11, 10],
    ];

    expect(findAllAntiNodes(nodesByFrequency, [11, 11])).toEqual(
      expect.arrayContaining(antiNodes)
    );
  });
});
