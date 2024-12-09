import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";

export const generateCalculations = (numbers, operators) => {
  const toBeEvaluated = [numbers];
  const calculations = [];
  let toEvaluate = null;
  while (toBeEvaluated.length) {
    toEvaluate = toBeEvaluated.pop();
    const replacements = operators.map((operation) =>
      toEvaluate.replace(" ", operation)
    );
    replacements.forEach((replacement) => {
      if (replacement.includes(" ")) {
        toBeEvaluated.push(replacement);
      } else {
        calculations.push(replacement);
      }
    });
  }
  return calculations;
};

export const evaluateCalculation = (calculation) => {
  const replacer = (match) => {
    if (match.includes("||")) {
      const result = match.replace("||", "");
      return eval(result);
    }
    return eval(match);
  };
  const operatorsRegex = /(^\d+(?:\*|\+|\|\|)\d+)/;
  let result = calculation;
  while (result.match(/\+|\*|\|\|/)) {
    result = result.replace(operatorsRegex, replacer);
  }
  return parseInt(result);
};

export const validateCalculation = (desired, numbers, operators) => {
  const calculations = generateCalculations(numbers, operators);
  for (const calculation of calculations) {
    if (evaluateCalculation(calculation) == desired) {
      return true;
    }
  }
  return false;
};
export const main = () => {
  const operators = ["*", "+", "||"];
  const lines = readTxtFile("./2024/day_07/input.txt");
  const linesParsed = lines.map((line) => {
    const [desired, numbers] = line.split(": ");
    return [parseInt(desired), numbers];
  });

  const valid = linesParsed.filter(([desired, numbers], i) => {
    console.log(`${i + 1}/${linesParsed.length}`);
    return validateCalculation(desired, numbers, operators);
  });
  console.log("VALID", valid);
  const sum = valid
    .map(([result, _]) => result)
    .reduce((prev, curr) => prev + curr);
  console.log(sum);
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
