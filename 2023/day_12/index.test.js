import {
  extractGroups,
  extractSprings,
  findGroupIndexesInArrangement,
  findTotalOfArrangements,
  generateArrangements,
  lookAheadForGroup,
  replaceAllUnknownsInArrangement,
  replaceUnknownInArrangement,
  transformLine,
  validateAllArrangements,
  validateArrangement,
} from ".";

describe("extractGroups", () => {
  it.each([
    ["???.### 1,1,3", [1, 1, 3]],
    [".??..??...?##. 1,1,3", [1, 1, 3]],
    ["?#?#?#?#?#?#?#? 1,3,1,6", [1, 3, 1, 6]],
    ["????.#...#... 4,1,1", [4, 1, 1]],
    ["????.######..#####. 1,6,5", [1, 6, 5]],
    ["?###???????? 3,2,1", [3, 2, 1]],
  ])("should return the correct groups", (inputLine, expectedGroups) => {
    const actualGroups = extractGroups(inputLine);

    expect(actualGroups).toEqual(expectedGroups);
  });
});

describe("extractSprings", () => {
  it.each([
    ["???.### 1,1,3", "???.###"],
    [".??..??...?##. 1,1,3", ".??..??...?##."],
    ["?#?#?#?#?#?#?#? 1,3,1,6", "?#?#?#?#?#?#?#?"],
    ["????.#...#... 4,1,1", "????.#...#..."],
    ["????.######..#####. 1,6,5", "????.######..#####."],
    ["?###???????? 3,2,1", "?###????????"],
  ])("should get the correct springs", (inputLine, springs) => {
    const actualSprings = extractSprings(inputLine);

    expect(actualSprings).toEqual(springs);
  });
});

describe("lookAheadForGroup", () => {
  it.each([
    [["#", ".", "#", ".", "#", "#", "#"], 1, 0, true],
    [["#", ".", "#", ".", "#", "#", "#"], 1, 2, true],
    [["#", ".", "#", ".", "#", "#", "#"], 3, 4, true],
    [["#", ".", "#", ".", "#", "#", "#"], 3, 5, false],
    [["#", ".", "#", ".", "#", "#", "#"], 1, 6, false],
    [["#", ".", "#", ".", "#", "#", "#"], 1, 4, false],
    [["#", ".", "#", ".", "#", "#", "#"], 3, 2, false],
  ])(
    "should look forward to find a group",
    (arrangement, groupSize, groupIndex, expected) => {
      const actual = lookAheadForGroup(arrangement, groupSize, groupIndex);
      expect(actual).toEqual(expected);
    }
  );
});

describe("findGroupIndexesInArrangement", () => {
  it.each([
    [["#", ".", "#", ".", "#", "#", "#"], 1, [0, 2]],
    [["#", ".", "#", ".", "#", "#", "#"], 3, [4]],
    [["#", "#", "#", "#", "#", "#", ".", "#", ".", "#"], 3, []],
  ])(
    "should find all groups in an arrangement of a certain size",
    (arrangement, groupSize, expectedGroupIndexes) => {
      const actualGroupsIndexes = findGroupIndexesInArrangement(
        arrangement,
        groupSize
      );

      expect(actualGroupsIndexes).toEqual(expectedGroupIndexes);
    }
  );
});

describe("replaceUnknownInArrangement", () => {
  it("should remove the first unknown and replace it with a dot and dash", () => {
    const unknownArrangement = "???.###";
    const expectedArrangements = [".??.###", "#??.###"];

    const actualArrangement = replaceUnknownInArrangement(unknownArrangement);

    expect(actualArrangement).toEqual(expectedArrangements);
  });
});

describe("replaceAllUnknownsInArrangement", () => {
  it("should remove all unknowns in the arrangement", () => {
    const unknownArrangement = "???.###";
    const expectedArrangements = [
      "....###",
      "..#.###",
      ".#..###",
      ".##.###",
      "#...###",
      "#.#.###",
      "##..###",
      "###.###",
    ];

    const actualArrangements =
      replaceAllUnknownsInArrangement(unknownArrangement);
    expect(actualArrangements.sort()).toEqual(expectedArrangements.sort());
  });
});

describe("validateArrangement", () => {
  it.each([
    ["Not enough groups", "....###", [1, 1, 3], false],
    ["Not enough groups", ".#..###", [1, 1, 3], false],
    ["All groups", ".#...#....###.", [1, 1, 3], true],
    ["All groups", ".#....#...###.", [1, 1, 3], true],
    ["Not enough", ".#........###.", [1, 1, 3], false],
    ["Not enough", "######.#.#.#.##", [1, 3, 1, 6], false],
    ["Not enough", "######.#.#...###", [1, 3, 1, 6], false],
    ["Extra one group", ".###.#.##.#.", [3, 2, 1], false],
    ["Wrong order", "######.###.#.#.", [1, 3, 1, 6], false],
    ["Wrong order", ".#.#.###.######", [1, 3, 1, 6], false],
    ["Extra group", ".###..##.#.#", [3, 2, 1], false],
  ])(
    "should validate arrangements - %s",
    (_, arrangement, groups, validation) => {
      const actualValidation = validateArrangement(arrangement, groups);
      expect(actualValidation).toEqual(validation);
    }
  );
});

describe("validateAllArrangements", () => {
  it("should validate all arrangements", () => {
    const inputArrangements = [
      "....###",
      "..#.###",
      ".#..###",
      ".##.###",
      "#...###",
      "#.#.###",
      "##..###",
      "###.###",
    ];
    const groups = [1, 1, 3];

    const validArrangement = ["#.#.###"];

    const actualValidArrangements = validateAllArrangements(
      inputArrangements,
      groups
    );

    expect(actualValidArrangements).toEqual(validArrangement);
  });
  it("should validate all arrangements", () => {
    const inputArrangements = [
      "######.###.#.#.",
      "######.#.# s##.#.",
      "######.#.#.###.",
      ".###.#.#.######",
      ".#.###.#.######",
      ".#.#.###.######",
    ];
    const groups = [1, 3, 1, 6];

    const validArrangement = [".#.###.#.######"];

    const actualValidArrangements = validateAllArrangements(
      inputArrangements,
      groups
    );

    expect(actualValidArrangements).toEqual(validArrangement);
  });
  it("should validate all arrangements", () => {
    const inputArrangements = [
      ".###.##.##.#",
      ".###.##.#.#.",
      ".###.##.#.##",
      ".###.##.#...",
      ".###.##.#..#",
      ".###.##..#..",
      ".###.##..#.#",
      ".###.##...#.",
      ".###.##....#",
      ".###.#.##.#.",
      ".###.#.##..#",
      ".###.#..##.#",
      ".###..##.#..",
      ".###..##.#.#",
      ".###..##..#.",
      ".###..##...#",
      ".###..#.##.#",
      ".###...##.#.",
      ".###...##..#",
      ".###....##.#",
    ];
    const groups = [3, 2, 1];

    const validArrangement = [
      ".###.##.#...",
      ".###.##..#..",
      ".###.##...#.",
      ".###.##....#",
      ".###..##.#..",
      ".###..##..#.",
      ".###..##...#",
      ".###...##.#.",
      ".###...##..#",
      ".###....##.#",
    ];

    const actualValidArrangements = validateAllArrangements(
      inputArrangements,
      groups
    );

    expect(actualValidArrangements).toEqual(validArrangement);
  });
});

describe("findTotalOfArrangements", () => {
  it("should find correct total", () => {
    const lines = [
      "???.### 1,1,3",
      ".??..??...?##. 1,1,3",
      "?#?#?#?#?#?#?#? 1,3,1,6",
      "????.#...#... 4,1,1",
      "????.######..#####. 1,6,5",
      "?###???????? 3,2,1",
    ];

    const expectedTotal = 21;

    const total = findTotalOfArrangements(lines);

    expect(total).toEqual(expectedTotal);
  });
});

describe("transformLine", () => {
  it("should transform line", () => {
    const line = "???.### 1,1,3";
    const expectedLine =
      "???.###????.###????.###????.###????.### 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3";
    const actualLine = transformLine(line);

    expect(actualLine).toEqual(expectedLine);
  });
});
