import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type T = string[][];
type E = number[][];
type POS = { col: number; row: number };
type MOVE = { col: number; row: number };

const data: T = getData(date, test)
  .split("\n")
  .map((l) => l.split(""));

const MAX_ROWS = data.length;
const MAX_COLS = data[0].length;

const visualize = (d: T | E): void =>
  console.log(d.map((e: number[] | string[]) => e.join("")).join("\n") + "\n");

const energy: E = data.map((row: string[]) => row.slice().map(() => 0));
energy[0][0] = 1;

visualize(data);

let lastThread: number = 0;

const nextThread = (): number => {
  lastThread++;
  return lastThread;
};

const move = (currentPosition: POS, direction: MOVE, thread: number): void => {
  if (lastThread > 25) {
    visualize(energy);
    console.log("energy", calculateEnergy());
    process.exit(0);
  }
  if (direction.col === -1 && currentPosition.col === 0) {
    console.log("stop", thread);
    return;
  }
  if (direction.col === 1 && currentPosition.col === MAX_COLS - 1) {
    console.log("stop", thread);
    return;
  }
  if (direction.row === -1 && currentPosition.row === 0) {
    console.log("stop", thread);
    return;
  }
  if (direction.row === 1 && currentPosition.row === MAX_ROWS - 1) {
    console.log("stop", thread);
    return;
  }

  const row: number = direction.row + currentPosition.row;
  const col: number = direction.col + currentPosition.col;
  const position = { col, row };
  energy[row][col] = 1;
  const next = data[row][col];

  if (
    next === "." ||
    (next === "|" && direction.row !== 0) ||
    (next === "-" && direction.col !== 0)
  ) {
    console.log(`continue ${next}`, thread);
    move(position, direction, thread);
    return;
  }

  if (next === "/") {
    console.log("turning /", thread);
    move(position, { col: -direction.row, row: -direction.col }, thread);
    return;
  }

  if (next === "\\") {
    console.log("turning \\", thread);
    move(position, { col: direction.row, row: direction.col }, thread);
    return;
  }

  if (next === "|") {
    console.log("split |", thread);
    move(position, { col: 0, row: -1 }, nextThread());
    move(position, { col: 0, row: 1 }, nextThread());
    return;
  }

  if (next === "-") {
    console.log("split -", thread);
    move(position, { col: -1, row: 0 }, nextThread());
    move(position, { col: 1, row: 0 }, nextThread());
    return;
  }
};

const calculateEnergy = (): number =>
  energy
    .map((r) => r.reduce((prev, curr) => prev + curr, 0))
    .reduce((prev, curr) => prev + curr, 0);

move({ col: 0, row: 0 }, { col: 1, row: 0 }, 0);

console.time("part 1");
console.timeEnd("part 1");

console.log("part 1", calculateEnergy());

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
