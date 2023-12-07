import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type Hand = string[];
type Bid = number;
interface Game {
  hand: Hand;
  bid: Bid;
  rank: number;
}
const strengths = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const data: Array<Game> = getData(date, test)
  .split("\n")
  .map((e) => e.split(" "))
  .map((e) => ({
    hand: e[0].split("") as Hand,
    bid: Number(e[1]),
    rank: 0,
  }));

console.time("part 1");

const sortedHand = (h: Hand): Hand => h.slice().sort();
const isFiveOfAKind = (h: Hand): boolean => [...new Set(h)].length === 1;
const isFourOfAKind = (h: Hand): boolean => {
  const h1 = sortedHand(h);
  return (
    (h1[0] === h1[1] &&
      h1[1] === h1[2] &&
      h1[2] === h1[3] &&
      h1[3] !== h1[4]) ||
    (h1[0] !== h1[1] && h1[1] === h1[2] && h1[2] === h1[3] && h1[3] === h1[4])
  );
};
const isFullHouse = (h: Hand): boolean => {
  const h1 = sortedHand(h);
  return (
    (h1[0] === h1[1] &&
      h1[1] !== h1[2] &&
      h1[2] === h1[3] &&
      h1[3] === h1[4]) ||
    (h1[0] === h1[1] && h1[1] === h1[2] && h1[2] !== h1[3] && h1[3] === h1[4])
  );
};
const isThreeOfAKind = (h: Hand): boolean => {
  const h1 = sortedHand(h);
  return (
    (h1[0] !== h1[1] &&
      h1[1] !== h1[2] &&
      h1[2] === h1[3] &&
      h1[3] === h1[4]) ||
    (h1[0] === h1[1] &&
      h1[1] === h1[2] &&
      h1[2] !== h1[3] &&
      h1[3] !== h1[4]) ||
    (h1[0] !== h1[4] && h1[1] === h1[2] && h1[2] === h1[3])
  );
};
const isTwoPairs = (h: Hand): boolean => [...new Set(h)].length === 3;
const isOnePair = (h: Hand): boolean => [...new Set(h)].length === 4;
const isHighCard = (h: Hand): boolean => [...new Set(h)].length === 5;

const testHand = (h: Hand): number => {
  if (isFiveOfAKind(h)) return 6;
  if (isFourOfAKind(h)) return 5;
  if (isFullHouse(h)) return 4;
  if (isThreeOfAKind(h)) return 3;
  if (isTwoPairs(h)) return 2;
  if (isOnePair(h)) return 1;
  return 0;
};

const compareHands = (h1: Hand, h2: Hand): number => {
  for (let i = 0; i < 5; i++) {
    if (h1[i] !== h2[i])
      return strengths.indexOf(h1[i]) < strengths.indexOf(h2[i]) ? 1 : -1;
  }
  return 0;
};

const sortHands = (a: Game, b: Game): number => {
  const t1 = testHand(a.hand);
  const t2 = testHand(b.hand);
  if (t1 > t2) return 1;
  if (t1 < t2) return -1;
  return compareHands(a.hand, b.hand);
};

const sortedHands = data.slice().sort((a, b) => sortHands(a, b));
for (let i = 0; i < sortedHands.length; i++) {
  sortedHands[i].rank = i + 1;
}

console.timeEnd("part 1");
console.log(
  "part 1",
  sortedHands.reduce((prev, curr) => prev + curr.rank * curr.bid, 0)
);

/* **************************************************************** */

console.time("part 2");
const strengths2 = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const handsWithJokerAtIndex = (h: Hand, index: number): Hand[] => {
  const hands: Hand[] = [];
  for (let i = 0; i < 12; i++) {
    const hand = h.slice();
    hand.splice(index, 1, strengths2[i]);
    hands.push(hand);
  }
  return hands;
};

const allHandsWithJoker = (h: Hand): Hand[] => {
  let hands: Hand[] = [h];
  for (let i = 0; i < 5; i++) {
    if (h[i] === "J") {
      hands = hands.map((e) => handsWithJokerAtIndex(e, i)).flat();
    }
  }
  return hands;
};

const compareHands2 = (h1: Hand, h2: Hand): number => {
  for (let i = 0; i < 5; i++) {
    if (h1[i] !== h2[i])
      return strengths2.indexOf(h1[i]) < strengths2.indexOf(h2[i]) ? 1 : -1;
  }
  return 0;
};

const testHand2 = (g: Game): number => {
  if (!g.hand.includes("J")) {
    return testHand(g.hand);
  }
  const allHands = allHandsWithJoker(g.hand);
  const sortedHands = allHands
    .slice()
    .sort((a, b) => sortHands({ ...g, hand: a }, { ...g, hand: b }));
  const hand = sortedHands[sortedHands.length - 1];
  return testHand(hand);
};

const sortHands2 = (a: Game, b: Game): number => {
  const t1 = testHand2(a);
  const t2 = testHand2(b);
  if (t1 > t2) return 1;
  if (t1 < t2) return -1;
  return compareHands2(a.hand, b.hand);
};

const sortedHands2 = data.slice().sort((a, b) => sortHands2(a, b));
for (let i = 0; i < sortedHands2.length; i++) {
  sortedHands2[i].rank = i + 1;
}

console.log(
  "part 2",
  sortedHands2.reduce((prev, curr) => prev + curr.rank * curr.bid, 0)
);
console.timeEnd("part 2");
