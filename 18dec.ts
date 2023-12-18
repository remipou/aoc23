import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type Step = {
  direction: string;
  length: number;
  color: string;
};

type Instr = Omit<Step, "color">;

type Pos = {
  x: number;
  y: number;
};

const data: Step[] = getData(date, test)
  .split("\n")
  .map((r) => r.split(" "))
  .map((e) => ({
    direction: e[0],
    length: Number(e[1]),
    color: e[2].replace(/\(|\)/g, ""),
  }));

const grid: number[][] = [];
for (let i = 0; i < 10; i++) {
  if (!grid[i]) grid[i] = [];
  for (let j = 0; j < 10; j++) {
    grid[i][j] = 0;
  }
}

const visualize = () =>
  console.log(grid.map((r) => r.join("")).join("\n") + "\n");

const part1 = (): void => {
  let position: Pos = { x: 0, y: 0 };
  let newPosition: Pos = { x: 0, y: 0 };
  for (let i = 0; i < data.length; i++) {
    const { direction, length } = data[i];
    if (direction === "R") {
      for (let x = 0; x <= length; x++) {
        grid[position.y][position.x + x] = 1;
        newPosition = { x: position.x + x, y: position.y };
      }
    }
    if (direction === "L") {
      for (let x = 0; x <= length; x++) {
        grid[position.y][position.x - x] = 1;
        newPosition = { x: position.x - x, y: position.y };
      }
    }
    if (direction === "D") {
      for (let y = 0; y <= length; y++) {
        grid[position.y + y][position.x] = 1;
        newPosition = { x: position.x, y: position.y + y };
      }
    }
    if (direction === "U") {
      for (let y = 0; y <= length; y++) {
        grid[position.y - y][position.x] = 1;
        newPosition = { x: position.x, y: position.y - y };
      }
    }
    position = { ...newPosition };
  }
};

part1();

visualize();

console.time("part 1");

console.timeEnd("part 1");
// console.log(part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
