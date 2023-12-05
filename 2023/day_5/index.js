import { readTxtFile } from "../../utils/utils.js";

export const createRangeFromLine = (line) => {
  const numbers = line.split(" ").map((n) => parseInt(n));
  const [destination, source, rangeLength] = numbers;
  return {
    source: {
      start: source,
      end: source - 1 + rangeLength,
    },
    destination: {
      start: destination,
      end: destination - 1 + rangeLength,
    },
  };
};
export const createReverseRangeFromLine = (line) => {
  const numbers = line.split(" ").map((n) => parseInt(n));
  const [destination, source, rangeLength] = numbers;
  return {
    destination: {
      start: source,
      end: source - 1 + rangeLength,
    },
    source: {
      start: destination,
      end: destination - 1 + rangeLength,
    },
  };
};

export const parseMap = (lines) => {
  return lines.map(createRangeFromLine);
};
export const parseReverseMap = (lines) => {
  return lines.map(createReverseRangeFromLine);
};

export const passSeedThroughMaps = (seed, maps) => {
  let newSeed = seed;
  for (const map of maps) {
    const seedInMapSource =
      newSeed >= map.source.start && newSeed <= map.source.end;
    if (!seedInMapSource) {
      continue;
    }
    const mapping = map.destination.start - map.source.start;
    newSeed += mapping;
    return newSeed;
  }
  return newSeed;
};

export const passAllSeedsThroughMaps = (seeds, maps) => {
  return seeds.map((seed) => passSeedThroughMaps(seed, maps));
};

export const createSeedsArrayFromLine = (inputSeeds) => {
  const ranges = [];
  for (let i = 0; i < inputSeeds.length - 2; i += 2) {
    const range = {
      start: inputSeeds[i],
      end: inputSeeds[i] + inputSeeds[i + 1] - 1,
    };
    ranges.push(range);
  }

  return ranges;
};

export const main = () => {
  const lines = readTxtFile("./2023/day_5/input.txt");
  // const seedToSoilMaps = parseReverseMap(lines.slice(3, 5));
  // const soilToFertilizerMaps = parseReverseMap(lines.slice(7, 10));
  // const fertilizerToWaterMaps = parseReverseMap(lines.slice(12, 16));
  // const waterToLightMaps = parseReverseMap(lines.slice(18, 20));
  // const lightToTempMaps = parseReverseMap(lines.slice(22, 25));
  // const tempToHumidityMaps = parseReverseMap(lines.slice(27, 29));
  // const humidityToLocationMaps = parseReverseMap(lines.slice(31));
  const seedToSoilMaps = parseReverseMap(lines.slice(3, 15));
  const soilToFertilizerMaps = parseReverseMap(lines.slice(18, 38));
  const fertilizerToWaterMaps = parseReverseMap(lines.slice(41, 88));
  const waterToLightMaps = parseReverseMap(lines.slice(91, 129));
  const lightToTempMaps = parseReverseMap(lines.slice(132, 147));
  const tempToHumidityMaps = parseReverseMap(lines.slice(150, 156));
  const humidityToLocationMaps = parseReverseMap(lines.slice(160));
  const seeds = lines[0].match(/(\d+)+/g).map((n) => parseInt(n));

  const ranges = createSeedsArrayFromLine(seeds);
  console.log(ranges);
  let lowestFound = false;
  let i = 0;
  while (!lowestFound) {
    const humidity = passAllSeedsThroughMaps([i], humidityToLocationMaps);
    const temp = passAllSeedsThroughMaps(humidity, tempToHumidityMaps);
    const light = passAllSeedsThroughMaps(temp, lightToTempMaps);
    const water = passAllSeedsThroughMaps(light, waterToLightMaps);
    const fertilizer = passAllSeedsThroughMaps(water, fertilizerToWaterMaps);
    const soil = passAllSeedsThroughMaps(fertilizer, soilToFertilizerMaps);
    const seed = passAllSeedsThroughMaps(soil, seedToSoilMaps);

    for (const range of ranges) {
      if (seed >= range.start && seed <= range.end) {
        console.log(range);
        console.log("SEED", seed);
        console.log("LOWEST", i);
        lowestFound = true;
        break;
      }
    }
    i++;
  }

  // const soil = passAllSeedsThroughMaps(
  //   [...rangeOne, ...rangeTwo],
  //   seedToSoilMaps
  // );
  // const fertilizer = passAllSeedsThroughMaps(soil, soilToFertilizerMaps);
  // const water = passAllSeedsThroughMaps(fertilizer, fertilizerToWaterMaps);
  // const light = passAllSeedsThroughMaps(water, waterToLightMaps);
  // const temp = passAllSeedsThroughMaps(light, lightToTempMaps);
  // const humidity = passAllSeedsThroughMaps(temp, tempToHumidityMaps);
  // const location = passAllSeedsThroughMaps(humidity, humidityToLocationMaps);

  // console.log(location);
  // console.log(Math.min(...location));
};

main();
