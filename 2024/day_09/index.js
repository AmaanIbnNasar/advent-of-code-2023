import { fileURLToPath } from "url";

export const repeatLetter = (letter, repetitions) => {
  return Array(repetitions).fill(letter).join("");
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
    if (frontChars.includes(".")) {
      const gapFiller = backChars.slice(0, frontChars.length);
      const rest = backChars.slice(frontChars.length);
      input[front] = gapFiller;
      input[back] = rest;
      if (rest.length == 0) {
        back--;
        if (front == back) {
          break;
        }
      }
    }
    if (!input[front].includes(".")) {
      front++;
    }
  }
  return input.join("");
};

export const main = () => {};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
