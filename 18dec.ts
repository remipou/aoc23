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

const grid: number[][] = [[1]];

const visualize = (g: number[][]) =>
  console.log(g.map((r: number[]) => r.join("")).join("\n") + "\n");

const extendGridRight = (): void => {
  for (let i = 0; i < grid.length; i++) {
    grid[i].push(0);
  }
};

const extendGridDown = (): void => {
  grid.push(new Array(grid[0].length).fill(0));
};

const extendGridUp = (): void => {
  grid.unshift(new Array(grid[0].length).fill(0));
};

const extendGridLeft = (): void => {
  for (let i = 0; i < grid.length; i++) {
    grid[i].unshift(0);
  }
};

const part1 = (): number => {
  let position: Pos = { x: 0, y: 0 };
  let newPosition: Pos = { x: 0, y: 0 };
  for (let i = 0; i < data.length; i++) {
    const { direction, length } = data[i];
    if (direction === "R") {
      for (let x = 1; x < length + 1; x++) {
        if (position.x + x > grid[0].length - 1) extendGridRight();
        grid[position.y][position.x + x] = 1;
        newPosition = { x: position.x + x, y: position.y };
      }
    }
    if (direction === "L") {
      for (let x = 1; x < length + 1; x++) {
        if (position.x - x < 0) extendGridLeft();
        grid[position.y][position.x - x] = 1;
        newPosition = { x: position.x - x, y: position.y };
      }
    }
    if (direction === "D") {
      for (let y = 1; y < length + 1; y++) {
        if (y + position.y > grid.length - 1) extendGridDown();
        grid[position.y + y][position.x] = 1;
        newPosition = { x: position.x, y: position.y + y };
      }
    }
    if (direction === "U") {
      for (let y = 1; y < length + 1; y++) {
        if (position.y - y < 0) extendGridUp();
        grid[position.y - y][position.x] = 1;
        newPosition = { x: position.x, y: position.y - y };
      }
    }
    position = { ...newPosition };
  }
  const newGrid: number[][] = grid.map((row: number[]) => row.slice());
  // visualize(grid);
  for (let y = 0; y < grid.length; y++) {
    let last: Pos | null = null;
    let hasPassedEdge: boolean = false;
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1 && (last === null || grid[last.y][last.x] === 0)) {
        hasPassedEdge = !hasPassedEdge;
      } else if (grid[y][x] === 0 && hasPassedEdge) {
        newGrid[y][x] = 1;
      }
      last = { x, y };
    }
  }
  // visualize(newGrid);
  return newGrid
    .map((r) => r.reduce((prev, curr) => prev + curr), 0)
    .reduce((prev, curr) => prev + curr, 0);
};

console.time("part 1");
// 26735 too low
// 26104 too low
console.log("part 1", part1());
console.timeEnd("part 1");

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
