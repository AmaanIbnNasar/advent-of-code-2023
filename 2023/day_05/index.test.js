// import {
//   createRangeFromLine,
//   createSeedsArrayFromLine,
//   parseMap,
//   passAllSeedsThroughMaps,
//   passSeedThroughMaps,
// } from ".";

import { main } from ".";

// describe("createRangeFromLine", () => {
//   it.each([
//     [
//       "50 98 2",
//       {
//         source: {
//           start: 98,
//           end: 99,
//         },
//         destination: {
//           start: 50,
//           end: 51,
//         },
//       },
//     ],
//     [
//       "52 50 48",
//       {
//         source: {
//           start: 50,
//           end: 97,
//         },
//         destination: {
//           start: 52,
//           end: 99,
//         },
//       },
//     ],
//   ])(
//     "should create a range object from the line",
//     (inputLine, expectedRange) => {
//       const actual = createRangeFromLine(inputLine);

//       expect(actual).toEqual(expectedRange);
//     }
//   );
// });

// describe("parseMap", () => {
//   it("should return a list of ranges for a map", () => {
//     const inputLines = ["0 15 37", "37 52 2", "39 0 15"];
//     const expectedRanges = [
//       {
//         source: {
//           start: 15,
//           end: 51,
//         },
//         destination: {
//           start: 0,
//           end: 36,
//         },
//       },
//       {
//         source: {
//           start: 52,
//           end: 53,
//         },
//         destination: {
//           start: 37,
//           end: 38,
//         },
//       },
//       {
//         source: {
//           start: 0,
//           end: 14,
//         },
//         destination: {
//           start: 39,
//           end: 53,
//         },
//       },
//     ];

//     const actualRanges = parseMap(inputLines);

//     expect(expectedRanges).toEqual(actualRanges);
//   });
// });

// describe("passSeedThroughMaps", () => {
//   it("should produce the correct seeds for one that requires mapping", () => {
//     const inputSeed = 79;
//     const inputMaps = [
//       {
//         source: {
//           start: 98,
//           end: 99,
//         },
//         destination: {
//           start: 50,
//           end: 51,
//         },
//       },
//       {
//         source: {
//           start: 50,
//           end: 97,
//         },
//         destination: {
//           start: 52,
//           end: 99,
//         },
//       },
//     ];

//     const expectedSeed = 81;

//     const actualSeed = passSeedThroughMaps(inputSeed, inputMaps);

//     expect(actualSeed).toEqual(expectedSeed);
//   });
//   it("should produce the correct seeds for one that requires mapping once", () => {
//     const inputSeed = 53;
//     const inputMaps = [
//       {
//         source: { start: 53, end: 60 },
//         destination: { start: 49, end: 56 },
//       },
//       {
//         source: { start: 11, end: 52 },
//         destination: { start: 0, end: 41 },
//       },
//       { source: { start: 0, end: 6 }, destination: { start: 42, end: 48 } },
//       {
//         source: { start: 7, end: 10 },
//         destination: { start: 57, end: 60 },
//       },
//     ];

//     const expectedSeed = 49;

//     const actualSeed = passSeedThroughMaps(inputSeed, inputMaps);

//     expect(actualSeed).toEqual(expectedSeed);
//   });
//   it("should produce the correct seeds for one that doesn't require mapping", () => {
//     const inputSeed = 14;
//     const inputMaps = [
//       {
//         source: {
//           start: 98,
//           end: 99,
//         },
//         destination: {
//           start: 50,
//           end: 51,
//         },
//       },
//       {
//         source: {
//           start: 50,
//           end: 97,
//         },
//         destination: {
//           start: 52,
//           end: 99,
//         },
//       },
//     ];

//     const expectedSeed = 14;

//     const actualSeed = passSeedThroughMaps(inputSeed, inputMaps);

//     expect(actualSeed).toEqual(expectedSeed);
//   });
// });

// describe("passAllSeedsThroughMaps", () => {
//   it("should produce the right output for all seeds", () => {
//     const inputSeeds = [79, 14, 55, 13];
//     const inputMaps = [
//       {
//         source: {
//           start: 98,
//           end: 99,
//         },
//         destination: {
//           start: 50,
//           end: 51,
//         },
//       },
//       {
//         source: {
//           start: 50,
//           end: 97,
//         },
//         destination: {
//           start: 52,
//           end: 99,
//         },
//       },
//     ];

//     const expectedSeeds = [81, 14, 57, 13];

//     const actualSeeds = passAllSeedsThroughMaps(inputSeeds, inputMaps);

//     expect(actualSeeds).toEqual(expectedSeeds);
//   });
//   it("should produce the correct mapping for all seeds", () => {
//     const inputSeeds = [79, 14, 55, 13];
//     const seedToSoilMaps = [
//       {
//         source: { start: 98, end: 99 },
//         destination: { start: 50, end: 51 },
//       },
//       {
//         source: { start: 50, end: 97 },
//         destination: { start: 52, end: 99 },
//       },
//     ];
//     const soilToFertilizerMaps = [
//       {
//         source: { start: 15, end: 51 },
//         destination: { start: 0, end: 36 },
//       },
//       {
//         source: { start: 52, end: 53 },
//         destination: { start: 37, end: 38 },
//       },
//       {
//         source: { start: 0, end: 14 },
//         destination: { start: 39, end: 53 },
//       },
//     ];
//     const fertilizerToWaterMaps = [
//       {
//         source: { start: 53, end: 60 },
//         destination: { start: 49, end: 56 },
//       },
//       {
//         source: { start: 11, end: 52 },
//         destination: { start: 0, end: 41 },
//       },
//       { source: { start: 0, end: 6 }, destination: { start: 42, end: 48 } },
//       {
//         source: { start: 7, end: 10 },
//         destination: { start: 57, end: 60 },
//       },
//     ];
//     const waterToLightMaps = [
//       {
//         source: { start: 18, end: 24 },
//         destination: { start: 88, end: 94 },
//       },
//       {
//         source: { start: 25, end: 94 },
//         destination: { start: 18, end: 87 },
//       },
//     ];

//     const lightToTempMaps = [
//       {
//         source: { start: 77, end: 99 },
//         destination: { start: 45, end: 67 },
//       },
//       {
//         source: { start: 45, end: 63 },
//         destination: { start: 81, end: 99 },
//       },
//       {
//         source: { start: 64, end: 76 },
//         destination: { start: 68, end: 80 },
//       },
//     ];
//     const tempToHumidityMaps = [
//       { source: { start: 69, end: 69 }, destination: { start: 0, end: 0 } },
//       { source: { start: 0, end: 68 }, destination: { start: 1, end: 69 } },
//     ];
//     const humidityToLocationMaps = [
//       {
//         source: { start: 56, end: 92 },
//         destination: { start: 60, end: 96 },
//       },
//       {
//         source: { start: 93, end: 96 },
//         destination: { start: 56, end: 59 },
//       },
//     ];

//     const expectedSoilOutput = [81, 14, 57, 13];
//     const soilOutput = passAllSeedsThroughMaps(inputSeeds, seedToSoilMaps);
//     expect(soilOutput).toEqual(expectedSoilOutput);

//     const expectedFertilizerOutput = [81, 53, 57, 52];
//     const fertilizerOutput = passAllSeedsThroughMaps(
//       expectedSoilOutput,
//       soilToFertilizerMaps
//     );
//     expect(fertilizerOutput).toEqual(expectedFertilizerOutput);

//     const expectedWaterOutput = [81, 49, 53, 41];
//     const waterOutput = passAllSeedsThroughMaps(
//       expectedFertilizerOutput,
//       fertilizerToWaterMaps
//     );
//     expect(waterOutput).toEqual(expectedWaterOutput);

//     const expectedLightOutput = [74, 42, 46, 34];
//     const lightOutput = passAllSeedsThroughMaps(
//       expectedWaterOutput,
//       waterToLightMaps
//     );
//     expect(lightOutput).toEqual(expectedLightOutput);

//     const expectedTempOutput = [78, 42, 82, 34];
//     const tempOutput = passAllSeedsThroughMaps(
//       expectedLightOutput,
//       lightToTempMaps
//     );
//     expect(tempOutput).toEqual(expectedTempOutput);

//     const expectedHumidityOutput = [78, 43, 82, 35];
//     const humidityOutput = passAllSeedsThroughMaps(
//       expectedTempOutput,
//       tempToHumidityMaps
//     );
//     expect(humidityOutput).toEqual(expectedHumidityOutput);

//     const expectedLocationOutput = [82, 43, 86, 35];
//     const locationOutput = passAllSeedsThroughMaps(
//       expectedHumidityOutput,
//       humidityToLocationMaps
//     );
//     expect(locationOutput).toEqual(expectedLocationOutput);
//   });
// });

// describe("createSeedsArrayFromLine", () => {
//   it("should create a range of seeds", () => {
//     const input = [79, 14, 55, 13];

//     const expectedRangeOne = Array.from({ length: 14 }, (_, i) => i + 79);
//     const expectedRangeTwo = Array.from({ length: 13 }, (_, i) => i + 55);

//     const [actualRangeOne, actualRangeTwo] = createSeedsArrayFromLine(input);

//     expect(actualRangeOne).toEqual(expectedRangeOne);
//     expect(actualRangeTwo).toEqual(expectedRangeTwo);
//   });
// });

describe("something", () => {
  it("should ", () => {
    main();
  });
});
