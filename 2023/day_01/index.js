import { readTxtFile } from "../../utils/utils.js";

export const NUMBERS_BY_WORD = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export const getNumbersFromLine = (line) => {
  let numbers = line.matchAll(
    /(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))/g
  );
  numbers = [...numbers].map((num) => {
    return num[1];
  });
  let firstNumber = numbers[0];
  let lastNumber = numbers[numbers.length - 1];
  if (isNaN(firstNumber)) {
    firstNumber = NUMBERS_BY_WORD[firstNumber];
  }
  if (isNaN(lastNumber)) {
    lastNumber = NUMBERS_BY_WORD[lastNumber];
  }
  const parsed = parseInt(`${firstNumber}${lastNumber}`);
  return parsed;
};

const main = () => {
  const input = readTxtFile("./day_1/input.txt");
  let sum = 0;
  for (const line of input) {
    const number = getNumbersFromLine(line);
    sum += number;
  }
};

// main();
