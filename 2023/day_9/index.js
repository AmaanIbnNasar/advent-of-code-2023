import { readTxtFile } from "../../utils/utils.js";
import { fileURLToPath } from "url";
export const findSequenceDifference = (sequence) => {
  const differences = [];
  let allSequencesFound = false;
  let currentSequence = sequence;
  let i = 0;
  while (!allSequencesFound) {
    const newSequence = [];
    for (let i = 0; i < currentSequence.length - 1; i++) {
      newSequence[i] = currentSequence[i + 1] - currentSequence[i];
    }
    currentSequence = newSequence;
    differences.push(currentSequence);
    if (currentSequence.every((n) => n == 0)) {
      allSequencesFound = true;
    }
    if (i > 10000) {
      return differences;
    }
    i++;
  }
  return differences;
};

export const findNextValue = (sequenceOne, sequenceTwo) => {
  const lastElemOne = sequenceOne[sequenceOne.length - 1];
  const lastElemTwo = sequenceTwo[sequenceTwo.length - 1];

  const nextValue = lastElemTwo + lastElemOne;
  return [...sequenceTwo, nextValue];
};

export const findNextValueForSequence = (sequences) => {
  let currentSequence = sequences[sequences.length - 1];
  let otherSequence = sequences[sequences.length - 2];
  for (let i = sequences.length - 1; i > 0; i--) {
    currentSequence = findNextValue(currentSequence, otherSequence);
    otherSequence = sequences[i - 2];
  }
  return currentSequence[currentSequence.length - 1];
};

export const findSumOfNextValues = (lines) => {
  const sequences = lines.map((line) =>
    line.split(" ").map((n) => parseInt(n))
  );
  const nextValues = [];
  for (const sequence of sequences) {
    const difference = findSequenceDifference(sequence);
    const nextValue = findNextValueForSequence([sequence, ...difference]);
    nextValues.push(nextValue);
  }
  return nextValues.reduce((a, b) => a + b);
};

export const main = () => {
  const lines = readTxtFile("./2023/day_9/input.txt");
  const reversedLines = lines.map((line) =>
    line.split(" ").reverse().join(" ")
  );
  const summedValue = findSumOfNextValues(lines);
  const summedValuePart2 = findSumOfNextValues(reversedLines);
  console.log(summedValue);
  console.log(summedValuePart2);
};

if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
