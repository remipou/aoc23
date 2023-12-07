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

// const tests = [
//   "AA111",
//   "A1A1A",
//   "AAAAA",
//   "AA8AA",
//   "23332",
//   "TTT98",
//   "23432",
//   "A23A4",
//   "23456",
// ];
// for (let i = 0; i < tests.length; i++) {
//   const hand: Hand = tests[i].split("");
//   console.log(hand, testHand(hand));
// }

// const tests2 = ["KTJJT", "KK677", "33332", "2AAAA", "77888", "77788"].map((e) =>
//   e.split("")
// );
// console.log(compareHands(tests2[0], tests2[1]));
// console.log(compareHands(tests2[2], tests2[3]));
// console.log(compareHands(tests2[4], tests2[5]));

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

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
