import { fileURLToPath } from "url";
import { readTxtFile } from "../../utils/utils.js";
export const extractGroups = (line) => {
  return line.match(/(\d)+/g).map((n) => parseInt(n));
};

export const extractSprings = (line) => {
  return line.split(" ")[0];
};

export const lookAheadForGroup = (arrangement, groupSize, groupIndex) => {
  const nextValues = arrangement.slice(groupIndex, groupIndex + groupSize + 1);
  const previousValue = arrangement[groupIndex - 1];
  const uniqueCounts = {};
  nextValues.forEach((spring) => {
    if (uniqueCounts[spring]) {
      uniqueCounts[spring] += 1;
    } else {
      uniqueCounts[spring] = 1;
    }
  });
  let nextValueContainsDot = false;
  for (let i = groupIndex; i < groupIndex + groupSize; i++) {
    if (arrangement[i] == ".") nextValueContainsDot = true;
  }
  return (
    uniqueCounts["#"] == groupSize &&
    !nextValueContainsDot &&
    previousValue != "#"
  );
};

export const replaceUnknownInArrangement = (arrangement) => {
  const dotReplace = arrangement.replace(/\?/, ".");
  const hashReplace = arrangement.replace(/\?/, "#");
  return [dotReplace, hashReplace];
};

export const replaceAllUnknownsInArrangement = (arrangement) => {
  const allArrangements = [];
  let allArrangementsFound = false;
  let arrangementsToReplace = [arrangement];
  let currentArrangement;
  while (!allArrangementsFound) {
    currentArrangement = arrangementsToReplace.pop();
    let [dotReplaced, dashReplaced] =
      replaceUnknownInArrangement(currentArrangement);
    const noUnknownsInDot = dotReplaced.match(/\?/g) == null;
    if (noUnknownsInDot) {
      allArrangements.push(dotReplaced);
    } else {
      arrangementsToReplace.push(dotReplaced);
    }
    const noUnknownsInDash = dashReplaced.match(/\?/g) == null;
    if (noUnknownsInDash) {
      allArrangements.push(dashReplaced);
    } else {
      arrangementsToReplace.push(dashReplaced);
    }
    if (arrangementsToReplace.length == 0) {
      allArrangementsFound = true;
    }
  }
  return allArrangements;
};

export const findGroupIndexesInArrangement = (arrangement, groupSize) => {
  const groupIndexes = [];
  for (const [i, spring] of arrangement.entries()) {
    const brokenSpring = spring == "#";
    const groupExists = lookAheadForGroup(arrangement, groupSize, i);
    if (brokenSpring && groupExists) {
      groupIndexes.push(i);
    }
  }
  return groupIndexes;
};

export const validateArrangement = (arrangement, groups) => {
  const arrangementGroups = arrangement
    .split(".")
    .filter((group) => group.includes("#"));

  if (arrangementGroups.length !== groups.length) {
    return false;
  }

  const zipped = arrangementGroups.map(function (e, i) {
    return [e, groups[i]];
  });

  return zipped.every(
    ([group, groupSize]) => groupSize == group.split("").length
  );
};

export const validateAllArrangements = (arrangements, groups) => {
  return arrangements.filter((arrangement) =>
    validateArrangement(arrangement, groups)
  );
};

export const findTotalOfArrangements = (lines) => {
  let total = 0;
  let i = 0;
  for (const line of lines) {
    const groups = extractGroups(line);
    const springs = extractSprings(line);
    const allArrangements = replaceAllUnknownsInArrangement(springs);
    const validatedArrangements = validateAllArrangements(
      allArrangements,
      groups
    );
    total += validatedArrangements.length;
    i++;
    console.log("Done line", i, total);
  }
  return total;
};

export const transformLine = (line) => {
  const [springs, groups] = line.split(" ");
  const newSprings = springs
    .split()
    .map((spring) => `${spring}?${spring}?${spring}?${spring}?${spring}`)
    .join();
  const newGroups = groups
    .split()
    .map((groups) => `${groups},${groups},${groups},${groups},${groups}`);
  return `${newSprings} ${newGroups}`;
};

export const main = () => {
  const lines = readTxtFile("./2023/day_12/test.txt");
  const linesPart2 = lines.map(transformLine);

  const total = findTotalOfArrangements(lines);
  const totalPart2 = findTotalOfArrangements(linesPart2);
  console.log(total);
  console.log(totalPart2);
};
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  main();
}
