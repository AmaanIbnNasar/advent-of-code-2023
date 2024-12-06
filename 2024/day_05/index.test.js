import {
  createOrderingObject,
  testDataOrderingRules,
  testDataUpdates,
  validateUpdate,
  whyInvalid,
} from ".";

describe("createOrderingObject", () => {
  it("should correctly create an ordering object", () => {
    const input = ["47|53", "97|13", "47|13"];

    const expectedOrdering = {
      47: { before: [53, 13], after: [] },
      53: { before: [], after: [47] },
      97: { before: [13], after: [] },
      13: { before: [], after: [97, 47] },
    };

    expect(createOrderingObject(input)).toEqual(expectedOrdering);
  });
});

describe("validateUpdate", () => {
  it.each([
    [0, true],
    [1, true],
    [2, true],
    [3, false],
    [4, false],
    [5, false],
  ])("should validate the update with rules", (i, expected) => {
    expect(validateUpdate(testDataUpdates[i], testDataOrderingRules)).toEqual(
      expected
    );
  });
});

describe("whyInvalid", () => {
  it("should return why an update is invalid", () => {
    const invalidUpdate = [75, 97, 47, 61, 53];
    const expectedReason = { firstNum: 75, secondNum: 97, reason: "after" };

    expect(whyInvalid(invalidUpdate, testDataOrderingRules)).toEqual(
      expectedReason
    );
  });
});
