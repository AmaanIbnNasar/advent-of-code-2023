import { isReportSafe } from ".";

describe("isReportSafe", () => {
  it.each([
    ["both", [1, 3, 2, 4, 5]],
    ["neither", [8, 6, 4, 4, 1]],
  ])(
    "should be unsafe if the report is not entirely increasing or decreasing - %s",
    (_, unsafeReport) => {
      expect(isReportSafe(unsafeReport)).toBe(false);
    }
  );
  it.each([
    ["increase of 5", [1, 2, 7, 8, 9]],
    ["decrease of 4", [9, 7, 6, 2, 1]],
  ])(
    "should be unsafe if the report has a difference of more than 3 - %s",
    (_, unsafeReport) => {
      expect(isReportSafe(unsafeReport)).toBe(false);
    }
  );
});
