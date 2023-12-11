import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: Array<Array<string>> = getData(date, test)
  .split("\n")
  .map((e) => e.split(""));

type MOVE = "UP" | "DOWN" | "LEFT" | "RIGHT";
type POS = [number, number];

console.log(data);
let start: POS = [0, 0];
for (let i = 0; i < data.length; i++) {
  if (data[i].includes("S")) {
    start = [data[i].indexOf("S"), i];
  }
}

/*****
| 
-
L
J
7
F
*******/

const possibleMoves = (start: POS): MOVE[] => {
  const moves: MOVE[] = [];
  const [x, y] = start;
  const upp = data[y - 1][x];
  const down = data[y + 1][x];
  const left = data[y][x - 1];
  const right = data[y][x + 1];
  console.log(start, upp, right, down, left);
  switch (upp) {
    case "|":
    case "F":
    case "7":
      moves.push("UP");
      break;
  }
  switch (down) {
    case "|":
    case "L":
    case "J":
      moves.push("DOWN");
      break;
  }
  switch (left) {
    case "-":
    case "L":
    case "F":
      moves.push("LEFT");
      break;
  }
  switch (right) {
    case "-":
    case "J":
    case "7":
      moves.push("RIGHT");
      break;
  }
  return moves;
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
  const moves = possibleMoves(start);
  let move: MOVE;
  if (last === null) {
    move = moves[1];
  } else {
    const testMove0 = makeMove(pos, moves[0]);
    if (testMove0[0] !== last[0] && testMove0[1] !== last[1]) {
      move = moves[0];
    } else {
      move = moves[1];
    }
  }
  console.log("===>", move);
  return makeMove(pos, move);
};
console.log("start --->", start);
let position: POS = makeStep(start);
let step: number = 1;
let last: POS = [...start];
while (position[0] !== start[0] || position[1] !== start[1]) {
  console.log("position", position, data[position[1]][position[0]]);
  const copyLast: POS = [...last];
  last = [...position];
  position = makeStep(position, copyLast);
  step++;
}

console.time("part 1");

console.timeEnd("part 1");
// console.log(part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
