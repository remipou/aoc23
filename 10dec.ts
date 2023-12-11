import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: Array<Array<string>> = getData(date, test)
  .split("\n")
  .map((e) => e.split(""));

type MOVE = "UP" | "DOWN" | "LEFT" | "RIGHT";
type POS = [number, number];

let start: POS = [0, 0];

for (let i = 0; i < data.length; i++) {
  if (data[i].includes("S")) {
    start = [data[i].indexOf("S"), i];
  }
}

console.time("part 1");

const possibleMoves = (start: POS): MOVE[] => {
  const moves: MOVE[] = [];
  const [x, y] = start;
  const current = data[y][x];
  const up = y > 0 ? data[y - 1][x] : "nope";
  const down = y < data.length - 1 ? data[y + 1][x] : "nope";
  const left = x > 0 ? data[y][x - 1] : "nope";
  const right = x < data[0].length - 1 ? data[y][x + 1] : "nope";
  if (
    (current === "S" || current === "-") &&
    (right === "-" || right === "7" || right === "J")
  ) {
    moves.push("RIGHT");
  }
  if (
    (current === "S" || current === "-") &&
    (left === "-" || left === "L" || left === "F")
  ) {
    moves.push("LEFT");
  }
  if (
    (current === "S" || current === "|") &&
    (up === "7" || up === "F" || up === "|")
  ) {
    moves.push("UP");
  }
  if (
    (current === "S" || current === "|") &&
    (down === "L" || down === "J" || down === "|")
  ) {
    moves.push("DOWN");
  }
  if (
    (current === "S" || current === "L") &&
    (right === "-" || right === "7" || right === "J")
  ) {
    moves.push("RIGHT");
  }
  if (
    (current === "S" || current === "L") &&
    (up === "|" || up === "7" || up === "F")
  ) {
    moves.push("UP");
  }
  if (
    (current === "S" || current === "7") &&
    (left === "-" || left === "L" || left === "F")
  ) {
    moves.push("LEFT");
  }
  if (
    (current === "S" || current === "7") &&
    (down === "|" || down === "J" || down === "L")
  ) {
    moves.push("DOWN");
  }
  if (
    (current === "S" || current === "J") &&
    (left === "-" || left === "L" || left === "F")
  ) {
    moves.push("LEFT");
  }
  if (
    (current === "S" || current === "J") &&
    (up === "|" || up === "F" || up === "7")
  ) {
    moves.push("UP");
  }
  if (
    (current === "S" || current === "F") &&
    (right === "-" || right === "7" || right === "J")
  ) {
    moves.push("RIGHT");
  }
  if (
    (current === "S" || current === "F") &&
    (down === "|" || down === "L" || down === "J")
  ) {
    moves.push("DOWN");
  }
  return [...new Set(moves)];
};

const makeMove = (pos: POS, move: MOVE): POS => {
  switch (move) {
    case "UP":
      return [pos[0], pos[1] - 1];
    case "DOWN":
      return [pos[0], pos[1] + 1];
    case "LEFT":
      return [pos[0] - 1, pos[1]];
    case "RIGHT":
      return [pos[0] + 1, pos[1]];
  }
};

const makeStep = (pos: POS, last: POS | null = null): POS => {
  const moves = possibleMoves(pos);
  let move: MOVE;
  if (last === null) {
    move = moves[1];
  } else if (last[0] === start[0] && last[1] === start[1]) {
    move = moves[0];
  } else {
    const testMove = makeMove(pos, moves[0]);
    if (testMove[0] === last[0] && testMove[1] === last[1]) {
      move = moves[1];
    } else {
      move = moves[0];
    }
  }

  // console.log(pos, "===>", data[pos[1]][pos[0]], "===>", moves, "===>", move);
  return makeMove(pos, move);
};
// console.log("start", start, data[start[1]][start[0]]);
let position: POS = makeStep(start);
let step: number = 1;
let last: POS = [...start];
const pipes = new Map<string, string>();
pipes.set(`${start[1]}_${start[0]}`, "S");
do {
  const copyLast: POS = [...last];
  last = [...position];
  position = makeStep(position, copyLast);
  if (position) {
    pipes.set(`${position[0]}_${position[1]}`, data[position[1]][position[0]]);
  }
  step++;
} while (position);

let copyforVisualization: string[][] = [];
for (let i = 0; i < data.length; i++) {
  copyforVisualization[i] = [];
  for (let j = 0; j < data[i].length; j++) {
    copyforVisualization[i][j] = pipes.get(`${j}_${i}`) || ".";
  }
}
console.log(copyforVisualization.map((l) => l.join("")).join("\n"));

console.timeEnd("part 1");
console.log("part 1", step / 2);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
