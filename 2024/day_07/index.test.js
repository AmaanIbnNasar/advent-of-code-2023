import {
  evaluateCalculation,
  generateCalculations,
  validateCalculation,
} from ".";

describe("generateCalculations", () => {
  it.each([
    ["81 40 27", ["*", "+"], ["81+40*27", "81+40+27", "81*40*27", "81*40+27"]],
    ["10 19", ["*", "+"], ["10*19", "10+19"]],
    [
      "11 6 16 10",
      ["*", "+"],
      [
        "11+6+16*10",
        "11+6+16+10",
        "11+6*16*10",
        "11+6*16+10",
        "11*6+16*10",
        "11*6+16+10",
        "11*6*16*10",
        "11*6*16+10",
      ],
    ],
  ])(
    "should return a list of the calculations",
    (inputNumbers, operators, expectedCalculations) => {
      const actual = generateCalculations(inputNumbers, operators);
      expect(actual).toEqual(expectedCalculations);
    }
  );
});

describe("evaluateCalculation", () => {
  it.each([
    ["11+6*16+20", 292],
    ["10*19", 190],
    ["1+2+3*4", 24],
  ])(
    "should evaluate left to right for the calculation - %s = %s",
    (calculation, desiredResult) => {
      expect(evaluateCalculation(calculation)).toEqual(desiredResult);
    }
  );
});

describe("validateCalculation", () => {
  it.each([
    [190, "10 19", ["*", "+"], true],
    [3267, "81 40 27", ["*", "+"], true],
    [292, "11 6 16 20", ["*", "+"], true],
  ])(
    "for %s and numbers %s with operators %s - should return %s",
    (desiredResult, numbers, operators, expectedResult) => {
      expect(validateCalculation(desiredResult, numbers, operators)).toEqual(
        expectedResult
      );
    }
  );
});
