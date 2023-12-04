import { readTxtFile } from "../../utils/utils.js";

export const convertLinesTo2DArray = (lines) => {
  return lines.map((line) => line.split(""));
};

export const getPartNumbers = (input) => {
  const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const NON_PARTS = [".", ...NUMBERS];
  const partNumbers = [];
  const gearRatios = [];
  for (const [i, line] of input.entries()) {
    for (const [j, char] of line.entries()) {
      if (!NON_PARTS.includes(char)) {
        const partNumsForPart = [];
        const left = j - 1;
        const up = i - 1;
        const right = j + 1;
        const down = i + 1;

        const leftOutOfBounds = left < 0;
        const rightOutOfBounds = right >= line.length;
        const upOutOfBounds = up < 0;
        const downOutOfBounds = down >= input.length;
        const leftUpOutOfBounds = leftOutOfBounds || upOutOfBounds;
        const rightUpOutOfBounds = rightOutOfBounds || upOutOfBounds;
        const leftDownOutOfBounds = leftOutOfBounds || downOutOfBounds;
        const rightDownOutOfBounds = rightOutOfBounds || downOutOfBounds;

        let upChar = upOutOfBounds ? "." : input[up][j];
        let leftChar = leftOutOfBounds ? "." : input[i][left];
        let rightChar = rightOutOfBounds ? "." : input[i][right];
        let downChar = downOutOfBounds ? "." : input[down][j];
        let leftUpChar = leftUpOutOfBounds ? "." : input[up][left];
        let rightUpChar = rightUpOutOfBounds ? "." : input[up][right];
        let leftDownChar = leftDownOutOfBounds ? "." : input[down][left];
        let rightDownChar = rightDownOutOfBounds ? "." : input[down][right];

        console.log(` ${upChar} 
${leftChar}${char}${rightChar}
 ${downChar} `);

        if (NUMBERS.includes(upChar)) {
          partNumsForPart.push(findFullNumber(input[up], j));
        }
        if (NUMBERS.includes(downChar)) {
          partNumsForPart.push(findFullNumber(input[down], j));
        }
        if (NUMBERS.includes(leftChar)) {
          partNumsForPart.push(findFullNumber(line, left));
        }
        if (NUMBERS.includes(rightChar)) {
          partNumsForPart.push(findFullNumber(line, right));
        }
        if (NUMBERS.includes(leftUpChar) && !NUMBERS.includes(upChar)) {
          partNumsForPart.push(findFullNumber(input[up], left));
        }
        if (NUMBERS.includes(rightUpChar) && !NUMBERS.includes(upChar)) {
          partNumsForPart.push(findFullNumber(input[up], right));
        }
        if (NUMBERS.includes(leftDownChar) && !NUMBERS.includes(downChar)) {
          partNumsForPart.push(findFullNumber(input[down], left));
        }
        if (NUMBERS.includes(rightDownChar) && !NUMBERS.includes(downChar)) {
          partNumsForPart.push(findFullNumber(input[down], right));
        }
        if (char == "*" && partNumsForPart.length == 2) {
          gearRatios.push(partNumsForPart[0] * partNumsForPart[1]);
        }
        partNumbers.push(...partNumsForPart);
      }
    }
  }
  console.log(gearRatios.reduce((prev, curr) => prev + curr, 0));
  return partNumbers;
};

export const findFullNumber = (line, numberIndex) => {
  const INVALID_CHARS = [".", "-", "@", "*", "=", "%", "&", "/", "#", "$", "+"];
  const leftLeftOutOfBounds = numberIndex - 2 < 0;
  const leftOutOfBounds = numberIndex - 1 < 0;
  const rightOutOfBounds = numberIndex + 1 > line.length;
  const rightRightOutOfBounds = numberIndex + 2 > line.length;

  const leftChar = leftOutOfBounds ? "." : line[numberIndex - 1];
  const leftLeftChar = leftLeftOutOfBounds ? "." : line[numberIndex - 2];
  const rightChar = rightOutOfBounds ? "." : line[numberIndex + 1];
  const rightRightChar = rightRightOutOfBounds ? "." : line[numberIndex + 2];

  let fullNum = line[numberIndex];

  fullNum = !INVALID_CHARS.includes(leftChar)
    ? `${leftChar}${fullNum}`
    : fullNum;
  fullNum =
    !INVALID_CHARS.includes(leftLeftChar) && !INVALID_CHARS.includes(leftChar)
      ? `${leftLeftChar}${fullNum}`
      : fullNum;
  fullNum = !INVALID_CHARS.includes(rightChar)
    ? `${fullNum}${rightChar}`
    : fullNum;
  fullNum =
    !INVALID_CHARS.includes(rightRightChar) &&
    !INVALID_CHARS.includes(rightChar)
      ? `${fullNum}${rightRightChar}`
      : fullNum;

  return parseInt(fullNum);
};

export const getSumOfPartNumbers = (lines) => {
  const parsedLines = convertLinesTo2DArray(lines);

  const partNumbers = getPartNumbers(parsedLines);
  return [...partNumbers].reduce((prev, curr) => prev + curr, 0);
};

const main = () => {
  const lines = readTxtFile("./2023/day_3/input.txt");

  const sum = getSumOfPartNumbers(lines);

  console.log(sum);
};

main();
