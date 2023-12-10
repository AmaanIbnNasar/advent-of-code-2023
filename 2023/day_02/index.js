import { readTxtFile } from "../../utils/utils.js";

export const parseOneSet = (set) => {
  const blue = (set.match(/(\d+) blue/) ?? [0, 0, 0])[1];
  const red = (set.match(/(\d+) red/) ?? [0, 0, 0])[1];
  const green = (set.match(/(\d+) green/) ?? [0, 0, 0])[1];

  return {
    blue: parseInt(blue),
    red: parseInt(red),
    green: parseInt(green),
  };
};

export const parseLineIntoSets = (line) => {
  return line.split(";");
};

export const checkGamePossible = (reducedGame) => {
  if (reducedGame.red > 12) return { possiblity: false, reason: "red" };
  if (reducedGame.green > 13) return { possibility: false, reason: "green" };
  if (reducedGame.blue > 14) return { possibility: false, reason: "blue" };
  return { possibility: true };
};

export const reduceGames = (lines) => {
  const games = {};
  for (const line of lines) {
    const gameID = line.match(/Game (\d+)/)[1];
    const sets = parseLineIntoSets(line);
    const parsedSets = sets.map((set) => parseOneSet(set));
    const reduction = parsedSets.reduce((prev, curr) => {
      return {
        blue: Math.max(prev.blue, curr.blue),
        red: Math.max(prev.red, curr.red),
        green: Math.max(prev.green, curr.green),
      };
    });
    const power = Object.values(reduction).reduce((prev, curr) => prev * curr);
    games[gameID] = checkGamePossible(reduction);
    games[gameID].power = power;
  }
  const possibleGames = Object.entries(games).filter(
    ([_, gameData]) => gameData.possibility
  );
  const gamePower = Object.values(games).reduce((prev, curr) => {
    return prev + curr.power;
  }, 0);
  return {
    part1: possibleGames.reduce((prev, curr) => {
      return prev + parseInt(curr[0]);
    }, 0),
    part2: gamePower,
  };
};

const main = () => {
  const lines = readTxtFile("./2023/day_2/input.txt");
  console.log(reduceGames(lines));
};

main();
