import { extractDirections } from ".";

describe("extractDirections", () => {
  it("should return a list of object directions", () => {
    const inputLines = [
      "R 6 (#70c710)",
      "D 5 (#0dc571)",
      "L 2 (#5713f0)",
      "D 2 (#d2c081)",
      "R 2 (#59c680)",
      "D 2 (#411b91)",
      "L 5 (#8ceee2)",
      "U 2 (#caa173)",
      "L 1 (#1b58a2)",
      "U 2 (#caa171)",
      "R 2 (#7807d2)",
      "U 3 (#a77fa3)",
      "L 2 (#015232)",
      "U 2 (#7a21e3)",
    ];

    const objectDirections = [
      { dir: "R", amount: 6 },
      { dir: "D", amount: 5 },
      { dir: "L", amount: 2 },
      { dir: "D", amount: 2 },
      { dir: "R", amount: 2 },
      { dir: "D", amount: 2 },
      { dir: "L", amount: 5 },
      { dir: "U", amount: 2 },
      { dir: "L", amount: 1 },
      { dir: "U", amount: 2 },
      { dir: "R", amount: 2 },
      { dir: "U", amount: 3 },
      { dir: "L", amount: 2 },
      { dir: "U", amount: 2 },
    ];

    const actualDirections = extractDirections(inputLines);

    expect(actualDirections).toEqual(objectDirections);
  });
});
