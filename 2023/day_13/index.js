import { fileURLToPath } from "url";
import { readTxtFile, transpose2DArray } from "../../utils/utils.js";

export const checkRowReflection = (row, indexToCheck) => {
  const reflectionSize = Math.min(
    row.length - indexToCheck - 1,
    indexToCheck + 1
  );
  const leftSide = row.slice(
    indexToCheck - reflectionSize + 1,
    indexToCheck + 1
  );
  const rightSide = row.slice(
    indexToCheck + 1,
    indexToCheck + reflectionSize + 1
  );

  return [...leftSide].join("") == [...rightSide].reverse().join("");
};

export const checkMirrorReflection = (mirror, indexToCheck) => {
  const reflectionExists = [];
  for (let i = 0; i < mirror.length; i++) {
    reflectionExists.push(checkRowReflection(mirror[i], indexToCheck));
  }

  return reflectionExists.every((reflection) => reflection);
};

export const calculateMirrorMetric = (mirror, original = -99) => {
  const transposedMirror = transpose2DArray([...mirror]);
  for (let i = 0; i < mirror[0].length - 1; i++) {
    if (checkMirrorReflection(mirror, i) && i + 1 != original) {
      return i + 1;
    }
  }
  for (let j = 0; j < transposedMirror[0].length - 1; j++) {
    if (
      checkMirrorReflection(transposedMirror, j) &&
      (j + 1) * 100 != original
    ) {
      return (j + 1) * 100;
    }
  }
};

export const calculateSmudgeMirror = (oldMirror, i, j) => {
  const newMirror = JSON.parse(JSON.stringify(oldMirror));

  if (oldMirror[i][j] == ".") {
    newMirror[i][j] = "#";
  } else {
    newMirror[i][j] = ".";
  }
  return [...newMirror];
};

export const calculateSmudgeMirrors = (mirror) => {
  const newMirrors = [];
  for (let i = 0; i < mirror.length; i++) {
    for (let j = 0; j < mirror[0].length; j++) {
      const newMirror = calculateSmudgeMirror(mirror, i, j);
      newMirrors.push(newMirror);
    }
  }
  return newMirrors;
};

export const calculateSmudgeMirrorMetrics = (mirror) => {
  const smudgeMirrors = {
    [mirror]: {
      smudges: calculateSmudgeMirrors([...mirror]),
      original: calculateMirrorMetric(mirror),
    },
  };
  const mirrorMetrics = new Set();
  for (const smudgeMirror of smudgeMirrors[mirror].smudges) {
    const mirrorMetric = calculateMirrorMetric(
      smudgeMirror,
      smudgeMirrors[mirror].original
    );
    if (mirrorMetric) {
      mirrorMetrics.add(mirrorMetric);
    }
  }
  return [...mirrorMetrics][0];
};
export const main = () => {
  const mirrors = readTxtFile("./2023/day_13/input.txt", "\n\n").map((row) =>
    row.split("\n").map((r) => r.split(""))
  );
  const output = mirrors.reduce((acc, mirror) => {
    return acc + calculateMirrorMetric(mirror);
  }, 0);
  console.log(output);
  const outputPart2 = mirrors.reduce((acc, mirror) => {
    return acc + calculateSmudgeMirrorMetrics(mirror);
  }, 0);
  console.log(outputPart2);
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
