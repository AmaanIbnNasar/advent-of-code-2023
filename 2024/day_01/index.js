import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";

const part_1 = (firstArr, secondArr) => {
  let sum = 0;
  firstArr.map((x, i) => {
    const y = secondArr[i];
    const dist = Math.abs(x - y);
    sum += dist;
  });

  console.log(sum);
};

const part_2 = (firstArr, secondArr) => {
  let sum = 0;
  firstArr.forEach((x) => {
    sum += x * secondArr.filter((y) => x == y).length;
  });
  console.log(sum);
};

export const main = () => {
  const input = readTxtFile("./2024/day_01/input.txt");
  const firstArr = [];
  const secondArr = [];
  input.forEach((pair) => {
    const [x, y] = pair.split("  ");
    firstArr.push(Number(x));
    secondArr.push(Number(y));
  });
  firstArr.sort();
  secondArr.sort();
  part_1(firstArr, secondArr);
  part_2(firstArr, secondArr);
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
