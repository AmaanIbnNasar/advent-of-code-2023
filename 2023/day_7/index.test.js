import {
  HAND_STRENGTH,
  calculateWinnings,
  compareHands,
  rankAllHands,
  rankHand,
} from ".";

describe("rankHand", () => {
  it.each([
    ["AAAAA", HAND_STRENGTH.FIVE_OF_A_KIND, 1],
    ["AA8AA", HAND_STRENGTH.FOUR_OF_A_KIND, 1],
    ["AA88A", HAND_STRENGTH.FULL_HOUSE, 1],
    ["AA89A", HAND_STRENGTH.THREE_OF_A_KIND, 1],
    ["A889A", HAND_STRENGTH.TWO_PAIR, 1],
    ["7889A", HAND_STRENGTH.PAIR, 1],
    ["7869A", HAND_STRENGTH.HIGH_CARD, 1],
    ["1111J", HAND_STRENGTH.FIVE_OF_A_KIND, 2],
    ["111JJ", HAND_STRENGTH.FIVE_OF_A_KIND, 2],
    ["11JJJ", HAND_STRENGTH.FIVE_OF_A_KIND, 2],
    ["1JJJJ", HAND_STRENGTH.FIVE_OF_A_KIND, 2],
    ["1112J", HAND_STRENGTH.FOUR_OF_A_KIND, 2],
    ["11J2J", HAND_STRENGTH.FOUR_OF_A_KIND, 2],
    ["12JJJ", HAND_STRENGTH.FOUR_OF_A_KIND, 2],
    ["11J23", HAND_STRENGTH.THREE_OF_A_KIND, 2],
    ["12JJ3", HAND_STRENGTH.THREE_OF_A_KIND, 2],
    ["11J22", HAND_STRENGTH.FULL_HOUSE, 2],
    ["1234J", HAND_STRENGTH.PAIR, 2],
  ])("should correctly rank %s as %d", (inputHand, expectedStrength, part) => {
    const actualStrength = rankHand(inputHand, part);

    expect(actualStrength).toEqual(expectedStrength);
  });
});

describe("rankAllHands", () => {
  it.each([
    [
      ["AA89A", "AA8AA", "A889A", "7889A", "AA88A", "AAAAA", "7869A"],
      {
        AAAAA: 7,
        AA8AA: 6,
        AA88A: 5,
        AA89A: 4,
        A889A: 3,
        "7889A": 2,
        "7869A": 1,
      },
    ],
    [
      ["32T3K", "T55J5", "KK677"],
      {
        "32T3K": 1,
        T55J5: 3,
        KK677: 2,
      },
    ],
    [
      ["32T3K", "T55J5", "KK677", "KTJJT", "QQQJA"],
      {
        "32T3K": 1,
        KTJJT: 2,
        KK677: 3,
        T55J5: 4,
        QQQJA: 5,
      },
    ],
  ])("should rank all hands by strength: %o", (inputHands, expectedRanks) => {
    const actualRanks = rankAllHands(inputHands);

    expect(actualRanks).toEqual(expectedRanks);
  });
});

describe("compareHands", () => {
  it.each([
    ["KK677", "KTJJT", 1],
    ["T55J5", "QQQJA", -1],
  ])("should return the correct sorting", (hand1, hand2, expected) => {
    const actual = compareHands(hand1, hand2);
    expect(actual).toEqual(expected);
  });
});

describe("calculateWinnings", () => {
  it("should calculate winnings correctly", () => {
    const lines = [
      "32T3K 765",
      "T55J5 684",
      "KK677 28",
      "KTJJT 220",
      "QQQJA 483",
    ];
    const winnings = 6440;

    const actual = calculateWinnings(lines);

    expect(actual).toEqual(winnings);
  });
});
