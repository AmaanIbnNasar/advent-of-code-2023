import { parseOneSet, reduceGames } from ".";

describe("parseOneSet", () => {
  it.each([
    [
      "3 blue, 4 red;",
      {
        blue: 3,
        red: 4,
        green: 0,
      },
    ],
    [
      "1 red, 2 green, 6 blue",
      {
        blue: 6,
        red: 1,
        green: 2,
      },
    ],
    [
      " 2 green",
      {
        blue: 0,
        red: 0,
        green: 2,
      },
    ],
  ])(
    "should return an object with number of blue, red and green cubes",
    (inputSet, expectedResult) => {
      const actualResult = parseOneSet(inputSet);

      expect(actualResult).toEqual(expectedResult);
    }
  );
});

describe("reduceGames", () => {
  it("should reduce the games to the impossible ones", () => {
    const inputLines = [
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
      "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    ];

    const expectedReduction = 8;

    const actualReduction = reduceGames(inputLines);

    expect(actualReduction).toEqual(expectedReduction);
  });
});
