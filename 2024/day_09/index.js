import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";
export const repeatLetter = (letter, repetitions) => {
  return Array(repetitions).fill(letter);
};

export const parseLine = (line) => {
  let isFile = true;
  let i = 0;
  let parsed = [];
  for (const char of line) {
    if (isFile) {
      const repeated = repeatLetter(i, parseInt(char));
      parsed.push(repeated);
      isFile = false;
    } else {
      const repeated = repeatLetter(".", parseInt(char));
      parsed.push(repeated);
      isFile = true;
      i++;
    }
  }
  return parsed;
};

export const fillGaps = (input) => {
  let front = 0;
  let back = input.length - 1;
  while (front != back) {
    const frontChars = input[front];
    const backChars = input[back];
    if (frontChars == ".") {
      input[front] = backChars;
      input[back] = "";
      back--;
      if (front == back) {
        break;
      }
    }
    if (input[front] != ".") {
      front++;
    }
  }

  return input
    .filter((num) => !["", "."].includes(num))
    .map((num) => parseInt(num));
};

export const calculateChecksum = (input) => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const digit = input[i];
    sum += digit * i;
  }
  return sum;
};

export const main = () => {
  const line = readTxtFile("./2024/day_09/test.txt");
  console.log(line[0]);
  const parsed = parseLine(line[0]);
  console.log("parsed", parsed);
  // const filled = fillGaps([...parsed]);
  // console.log("filled", filled);
  // console.log(calculateChecksum(filled));
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
