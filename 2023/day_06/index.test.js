import {
  findWinsForAllRaces,
  findWinsInRace,
  formatRaces,
  simulateRace,
} from ".";

describe("formatRaces", () => {
  it("should return list of race objects", () => {
    const lines = ["Time:      7  15   30", "Distance:  9  40  200"];

    const expectedRaces = [
      {
        time: 7,
        distance: 9,
      },
      {
        time: 15,
        distance: 40,
      },
      {
        time: 30,
        distance: 200,
      },
    ];

    const actualRaces = formatRaces(lines);

    expect(actualRaces).toEqual(expectedRaces);
  });
});

describe("findWinsInRaces", () => {
  it("should find all the ways to beat the distance in a race", () => {
    const inputRace = {
      time: 7,
      distance: 9,
    };

    const expectedWins = 4;

    const actualWins = findWinsInRace(inputRace);

    expect(actualWins).toEqual(expectedWins);
  });
});

describe("simulateRace", () => {
  it("should return the distance traveled by a boat", () => {
    const inputTime = 7;
    const inputButton = 1;

    const expectedDistance = 6;

    const actualDistance = simulateRace(inputTime, inputButton);

    expect(actualDistance).toEqual(expectedDistance);
  });
});

describe("findWindsForAllRaces", () => {
  it("should return the right answer", () => {
    const inputRaces = [
      {
        time: 7,
        distance: 9,
      },
      {
        time: 15,
        distance: 40,
      },
      {
        time: 30,
        distance: 200,
      },
    ];

    const expectedWins = 288;

    const actualWins = findWinsForAllRaces(inputRaces);

    expect(actualWins).toEqual(expectedWins);
  });
});
