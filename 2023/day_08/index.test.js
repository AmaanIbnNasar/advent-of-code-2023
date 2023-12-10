import { createMap, findZZZ } from ".";

describe("createMap", () => {
  it("should create the map from lines", () => {
    const lines = [
      "AAA = (BBB, CCC)",
      "BBB = (DDD, EEE)",
      "CCC = (ZZZ, GGG)",
      "DDD = (DDD, DDD)",
      "EEE = (EEE, EEE)",
      "GGG = (GGG, GGG)",
      "ZZZ = (ZZZ, ZZZ)",
    ];

    const expectedMap = {
      AAA: { L: "BBB", R: "CCC" },
      BBB: { L: "DDD", R: "EEE" },
      CCC: { L: "ZZZ", R: "GGG" },
      DDD: { L: "DDD", R: "DDD" },
      EEE: { L: "EEE", R: "EEE" },
      GGG: { L: "GGG", R: "GGG" },
      ZZZ: { L: "ZZZ", R: "ZZZ" },
    };

    const actualMap = createMap(lines);

    expect(actualMap).toEqual(expectedMap);
  });
});

describe("findZZZ", () => {
  it("should find ZZZ and return steps", () => {
    const inputMap = {
      AAA: { L: "BBB", R: "CCC" },
      BBB: { L: "DDD", R: "EEE" },
      CCC: { L: "ZZZ", R: "GGG" },
      DDD: { L: "DDD", R: "DDD" },
      EEE: { L: "EEE", R: "EEE" },
      GGG: { L: "GGG", R: "GGG" },
      ZZZ: { L: "ZZZ", R: "ZZZ" },
    };
    const inputInstructions = ["R", "L"];

    const expectedSteps = 2;

    const actualSteps = findZZZ(inputMap, inputInstructions);

    expect(actualSteps).toEqual(expectedSteps);
  });
  it("should find ZZZ and return steps 2", () => {
    const inputMap = {
      AAA: { L: "BBB", R: "BBB" },
      BBB: { L: "AAA", R: "ZZZ" },
      ZZZ: { L: "ZZZ", R: "ZZZ" },
    };

    const inputInstructions = ["L", "L", "R"];

    const expectedSteps = 6;

    const actualSteps = findZZZ(inputMap, inputInstructions);

    expect(actualSteps).toEqual(expectedSteps);
  });
});
