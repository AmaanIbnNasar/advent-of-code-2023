import { readTxtFile } from "../../utils/utils.js";

export const parseOneLine = (line) => {
  const [winningSide, ourSide] = line.split("|");

  const winningNumbers = winningSide
    .match(/(\d+)+/g)
    .slice(1)
    .map((n) => parseInt(n));
  const ourNumbers = ourSide.match(/(\d+)+/g).map((n) => parseInt(n));
  return {
    winning: winningNumbers,
    our: ourNumbers,
  };
};

export const getOurWinningNumbers = (input) => {
  return input.our.filter((n) => input.winning.includes(n));
};

export const getPointsForCard = (input) => {
  const parsedCard = parseOneLine(input);

  const winningNumbers = getOurWinningNumbers(parsedCard);

  const o = {
    numbers: winningNumbers,
    points: winningNumbers.length != 0 ? 2 ** (winningNumbers.length - 1) : 0,
  };

  return o;
};

export const getAllPoints = (lines) => {
  let copies = Array.from({ length: lines.length }, (_, i) => 1);
  for (const [i, line] of lines.entries()) {
    const lineObj = getPointsForCard(line);
    for (let n = 1; n <= lineObj.numbers.length; n++) {
      copies[i + n] += copies[i];
    }
  }
  const points = lines
    .map((line) => getPointsForCard(line).points)
    .reduce((prev, curr) => prev + curr, 0);
  return {
    points: points,
    copies: copies.reduce((prev, curr) => prev + curr, 0),
  };
};

export const main = () => {
  const lines = readTxtFile("./2023/day_4/input.txt");
  console.log(getAllPoints(lines));
};

main();
