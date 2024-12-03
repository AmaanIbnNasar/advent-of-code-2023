import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";

export const isReportSafe = (report, recurse = false) => {
  let safety = true;
  let increasing = false;
  let decreasing = false;
  let neitherIncreaseNorDecrease = false;
  let differenceTooBig = false;
  const issues = [];
  for (let x = 0; x < report.length - 1; x++) {
    const firstNum = report[x];
    const secondNum = report[x + 1];
    const difference = Math.abs(firstNum - secondNum);
    if (firstNum < secondNum) {
      increasing = true;
      if (decreasing) {
        issues.push([x, x + 1]);
      }
    } else if (secondNum < firstNum) {
      decreasing = true;
      if (increasing) {
        issues.push([x, x + 1]);
      }
    } else {
      neitherIncreaseNorDecrease = true;
      issues.push([x, x + 1]);
    }
    if (difference > 3) {
      differenceTooBig = true;
      issues.push([x, x + 1]);
    }
  }
  if (
    (increasing && decreasing) ||
    neitherIncreaseNorDecrease ||
    differenceTooBig
  ) {
    safety = false;
  }
  if (recurse)
    console.log(
      "SAFETY",
      safety,
      "ISSUES",
      issues.map(([x, y]) => [report[x], report[y]])
    );
  if (!safety && recurse) {
    let isNowSafe = false;
    for (let x = 0; x < report.length; x++) {
      const reportWithoutX = [...report.slice(0, x), ...report.slice(x + 1)];
      if (isReportSafe(reportWithoutX, false)) {
        isNowSafe = true;
      }
    }
    safety = isNowSafe;
  }
  return safety;
};

export const main = () => {
  const reports = readTxtFile("./2024/day_02/input.txt");
  const safeReports = reports.reduce((prev, report) => {
    const reportAsNums = report.split(" ").map(Number);
    if (isReportSafe(reportAsNums, true)) {
      return prev + 1;
    }
    return prev;
  }, 0);
  console.log(safeReports);
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
