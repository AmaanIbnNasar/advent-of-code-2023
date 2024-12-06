import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";

export const parseLine = (line) => {
  const multiplicationRegex = /mul\((\d+),(\d+)\)/g;
  const result = [...line.matchAll(multiplicationRegex)];
  return result.flatMap((matches) => [
    parseInt(matches[1]),
    parseInt(matches[2]),
  ]);
};
export const parseLinePartTwo = (line) => {
  const multiplicationRegex = /(mul\(\d{1,3},\d{1,3}\)|do(?:n't)?)/g;
  const doRegex = /do\(\)(.*[don't\(\)]?)/g;
  const dontRegex = /don't\(\).*do\(\)/g;
  const result = [...line.match(multiplicationRegex)];
  const doResult = [...line.matchAll(doRegex)];
  const dontResult = [...line.matchAll(dontRegex)];
  const doNums = doResult.flatMap((matches) => parseLine(matches[0]));
  const dontNums = dontResult.flatMap((matches) => parseLine(matches[0]));
  const fullList = result.flatMap((matches) => [parseLine(matches[0])]).flat();
  console.log(result);
  const mults = [];
  let increasing = true;
  for (let mult of result) {
    if (mult == "don't") {
      increasing = false;
    }
    if (mult == "do") {
      increasing = true;
    }
    if (!increasing) {
      continue;
    }
    if (increasing && mult != "do") {
      mults.push(parseLine(mult));
    }
  }
  console.log(mults);
  return mults;
};

export const processMultiplications = (multiplications) => {
  return multiplications.reduce((prevResult, multiplication) => {
    return prevResult + multiplication[0] * multiplication[1];
  }, 0);
};

export const main = () => {
  const lines = readTxtFile("./2024/day_03/input.txt");
  const multiplications = lines.map((line) => parseLinePartTwo(line));
  const result = multiplications.flatMap((mult) =>
    processMultiplications(mult)
  );
  console.log(result.reduce((prev, curr) => prev + curr));
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
