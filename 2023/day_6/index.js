import { readTxtFile } from "../../utils/utils.js";

export const formatRaces = (lines) => {
  const times = lines[0].match(/(\d+)+/g).map((n) => parseInt(n));
  const distances = lines[1].match(/(\d+)+/g).map((n) => parseInt(n));

  const races = times.map((n, i) => {
    return {
      time: times[i],
      distance: distances[i],
    };
  });
  return races;
};

export const findWinsInRace = (race) => {
  const potentials = Array.from({ length: race.time - 1 }, (_, i) => i + 1);
  const simulatedRaces = potentials.map((n) => simulateRace(race.time, n));
  return simulatedRaces.filter((n) => n > race.distance).length;
};

export const simulateRace = (time, button) => {
  const timeToTravel = time - button;
  const distanceTraveled = button * timeToTravel;
  return distanceTraveled;
};

export const findWinsForAllRaces = (races) => {
  return races
    .map((race) => findWinsInRace(race))
    .reduce((prev, curr) => prev * curr);
};

const main = () => {
  const lines = readTxtFile("./2023/day_6/input2.txt");
  const races = formatRaces(lines);
  const wins = findWinsForAllRaces(races);
  console.log(wins);
};

main();
