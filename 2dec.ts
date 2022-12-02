import fs from "fs";

const data: string = fs.readFileSync("./data/2dec.txt", "utf8");
// const data: string = fs.readFileSync("./samples/2dec.txt", "utf8");

const game: Array<string> = data.split("\n");
const values: { [key: string]: number } = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

console.time("part 1");
const playRound = (game: string): number => {
  switch (game) {
    case "A X":
    case "B Y":
    case "C Z":
      return 3;
    case "A Y":
    case "B Z":
    case "C X":
      return 6;
    default:
      return 0;
  }
};

const part1: number = game.reduce(
  (acc: number, round: string) =>
    acc + playRound(round) + values[round.split(" ")[1]],
  0
);
console.timeEnd("part 1");
console.log(part1);

console.time("part 2");

const getOutcome = (input: string): number => {
  const parts = input.split(" ");
  switch (parts[1]) {
    case "Y":
      return 3;
    case "Z":
      return 6;
    default:
      return 0;
  }
};

const moves = ["X", "Y", "Z"];

const makeMove = (input: string): number => {
  const outcome = getOutcome(input);
  const opponemtMove: string = input.split(" ")[0];
  for (let k in moves) {
    if (playRound(`${opponemtMove} ${moves[k]}`) === outcome) {
      return outcome + values[moves[k]];
    }
  }
  return 0;
};

const part2: number = game.reduce(
  (acc: number, round: string) => acc + makeMove(round),
  0
);

console.timeEnd("part 2");
console.log(part2);
