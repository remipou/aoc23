import getData from "./data";

const [_ts, _file, date, test] = process.argv;

interface Game {
  id: number;
  winningCards: Array<string>;
  myCards: Array<string>;
  count: number;
}

const data: Array<Game> = getData(date, test)
  .split("\n")
  .map((e) => e.replace(/^Card\s+(\d+):(.*)$/, "$1|$2"))
  .map((e) =>
    e
      .split("|")
      .map((i) => i.trim())
      .map((e) => e.split(" ").filter((e) => e.length))
  )
  .map((e) => ({
    id: parseInt(e[0][0], 0),
    winningCards: e[1],
    myCards: e[2],
    count: 1,
  }));

console.time("part 1");
const calculatePoints = (game: Game): number => {
  const matches = game.myCards.filter((c) => game.winningCards.includes(c));
  if (matches.length === 0) return 0;
  let p = 1;
  for (let i = 1; i < matches.length; i++) {
    p *= 2;
  }
  return p;
};
const part1 = data
  .map((g) => calculatePoints(g))
  .reduce((prev, curr) => prev + curr, 0);

console.timeEnd("part 1");
console.log(part1);

console.time("part 2");
for (const g in data) {
  const game = data[g];
  const wins = game.myCards.filter((c) => game.winningCards.includes(c)).length;
  for (let i = game.id; i < game.id + wins; i++) {
    data[i].count = data[i].count + game.count;
  }
}

console.timeEnd("part 2");

console.log(data.reduce((prev: number, curr: Game) => prev + curr.count, 0));
