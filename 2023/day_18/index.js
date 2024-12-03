import { fileURLToPath } from "url";

export const extractDirections = (lines) => {
  return lines.map((line) => {
    const firstHalf = line.split(" (")[0];
    const [direction, amount] = firstHalf.split(" ");

    return {
      dir: direction,
      amount: parseInt(amount),
    };
  });
};

export const shoelaceFormula = () => {};

export const main = () => {};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
