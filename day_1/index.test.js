import { getNumbersFromLine } from ".";

describe("getNumbersFromLine", () => {
  it("should get the numbers from the line", () => {
    const inputString = "1abc2";

    const expectedNumber = 12;
    const actualNumber = getNumbersFromLine(inputString);

    expect(actualNumber).toEqual(expectedNumber);
  });
  it("should get multiple from the line", () => {
    const inputString = "a1b2c3d4e5f";

    const expectedNumber = 15;
    const actualNumber = getNumbersFromLine(inputString);

    expect(actualNumber).toEqual(expectedNumber);
  });
  it("should get a single number correctly", () => {
    const inputString = "treb7uchet";

    const expectedNumber = 77;
    const actualNumber = getNumbersFromLine(inputString);

    expect(actualNumber).toEqual(expectedNumber);
  });
  it("should get a word numbers correctly", () => {
    const inputString = "two1nine";

    const expectedNumber = 29;
    const actualNumber = getNumbersFromLine(inputString);

    expect(actualNumber).toEqual(expectedNumber);
  });
});
