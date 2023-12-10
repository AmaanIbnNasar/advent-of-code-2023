import { readTxtFile } from "../../utils/utils.js";

export const HAND_STRENGTH = {
  FIVE_OF_A_KIND: 7,
  FOUR_OF_A_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIR: 3,
  PAIR: 2,
  HIGH_CARD: 1,
};

export const CARD_VALUES = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  J: 11,
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
};

export const CARD_VALUES_PART_2 = { ...CARD_VALUES, J: 1 };

export const rankHand = (hand, part = 1) => {
  const uniqueCounts = {};
  const handSplit = hand.split("");
  handSplit.forEach((card) => {
    if (uniqueCounts[card]) {
      uniqueCounts[card] += 1;
    } else {
      uniqueCounts[card] = 1;
    }
  });
  const fiveOfAKind = new Set(hand).size === 1;
  const fourOfAKind = Object.values(uniqueCounts).includes(4);
  const threeOfAKind = Object.values(uniqueCounts).includes(3);
  const twoPair =
    Object.values(uniqueCounts).filter((n) => n === 2).length === 2;
  const pair = Object.values(uniqueCounts).includes(2);

  const handWithoutJokers = handSplit.filter((card) => card !== "J");
  const uniqueCountsWithoutJokers = {};
  handWithoutJokers.forEach((card) => {
    if (uniqueCountsWithoutJokers[card]) {
      uniqueCountsWithoutJokers[card] += 1;
    } else {
      uniqueCountsWithoutJokers[card] = 1;
    }
  });
  const jokers = handSplit.filter((card) => card === "J");
  const fourOfAKindAndOneJoker =
    Object.values(uniqueCountsWithoutJokers).includes(4) && jokers.length == 1;
  const threeOfAKindAndTwoJokers =
    Object.values(uniqueCountsWithoutJokers).includes(3) && jokers.length == 2;
  const pairAndThreeJokers =
    Object.values(uniqueCountsWithoutJokers).includes(2) && jokers.length == 3;
  const cardAndFourJokers =
    Object.values(uniqueCountsWithoutJokers).includes(1) && jokers.length == 4;

  const jokerFiveOfAKind =
    (fourOfAKindAndOneJoker ||
      threeOfAKindAndTwoJokers ||
      pairAndThreeJokers ||
      cardAndFourJokers) &&
    part === 2;

  const threeOfAKindAndOneJoker =
    Object.values(uniqueCountsWithoutJokers).includes(3) && jokers.length == 1;
  const pairAndTwoJokers =
    Object.values(uniqueCountsWithoutJokers).includes(2) && jokers.length == 2;
  const cardAndThreeJokers =
    Object.values(uniqueCountsWithoutJokers).includes(1) && jokers.length == 3;
  const jokerFourOfAKind =
    (threeOfAKindAndOneJoker || pairAndTwoJokers || cardAndThreeJokers) &&
    part == 2;

  const pairAndOneJoker =
    Object.values(uniqueCountsWithoutJokers).includes(2) && jokers.length == 1;
  const cardAndTwoJokers =
    Object.values(uniqueCountsWithoutJokers).includes(1) && jokers.length == 2;
  const jokerThreeOfAKind = (pairAndOneJoker || cardAndTwoJokers) && part == 2;

  const jokerFullHouse =
    Object.values(uniqueCountsWithoutJokers).every((n) => n == 2) &&
    jokers.length == 1 &&
    part == 2;

  const jokerPair =
    Object.values(uniqueCountsWithoutJokers).length == 4 &&
    jokers.length == 1 &&
    part == 2;

  if (fiveOfAKind || jokerFiveOfAKind) return HAND_STRENGTH.FIVE_OF_A_KIND;
  if (fourOfAKind || jokerFourOfAKind) return HAND_STRENGTH.FOUR_OF_A_KIND;
  if ((threeOfAKind && pair) || jokerFullHouse) return HAND_STRENGTH.FULL_HOUSE;
  if (threeOfAKind || jokerThreeOfAKind) return HAND_STRENGTH.THREE_OF_A_KIND;
  if (twoPair) return HAND_STRENGTH.TWO_PAIR;
  if (pair || jokerPair) return HAND_STRENGTH.PAIR;
  return HAND_STRENGTH.HIGH_CARD;
};

export const rankAllHands = (hands, part = 1) => {
  const rankedHands = hands.map((hand) => {
    return {
      hand,
      rank: rankHand(hand, part),
    };
  });

  return rankedHands
    .sort((a, b) => {
      if (a.rank == b.rank) {
        return compareHands(a.hand, b.hand, part);
      }
      return a.rank - b.rank;
    })
    .reduce((prev, curr, i) => {
      return {
        ...prev,
        [curr.hand]: i + 1,
      };
    }, {});
};

export const compareHands = (hand1, hand2, part = 1) => {
  const cardValues = part === 1 ? CARD_VALUES : CARD_VALUES_PART_2;
  const zipped = hand1.split("").map((n, i) => [n, hand2[i]]);
  for (let [card1, card2] of zipped) {
    if (cardValues[card1] > cardValues[card2]) return 1;
    if (cardValues[card1] < cardValues[card2]) return -1;
  }
};

export const calculateWinnings = (lines, part = 1) => {
  const bidsByHands = lines.reduce((prev, curr) => {
    const [hand, big] = curr.split(" ");
    return {
      ...prev,
      [hand]: parseInt(big),
    };
  }, {});
  const ranks = rankAllHands(Object.keys(bidsByHands), part);
  return Object.entries(ranks).reduce((prev, [hand, rank]) => {
    return prev + bidsByHands[hand] * rank;
  }, 0);
};

export const main = () => {
  const lines = readTxtFile("./2023/day_7/input.txt");
  const winnings = calculateWinnings(lines, 2);
  console.log(winnings);
};
// main();
