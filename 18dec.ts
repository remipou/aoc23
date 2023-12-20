import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type Step = {
  direction: string;
  length: number;
  color: string;
};

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

const grid: Map<string, string> = new Map();

const part1 = (): number => {
  let position: Pos = { x: 0, y: 0 };
  let newPosition: Pos = { x: 0, y: 0 };
  for (let i = 0; i < data.length; i++) {
    const { direction, length, color } = data[i];
    if (direction === "R") {
      for (let x = 1; x < length + 1; x++) {
        if (!grid.has(`${position.x + x}_${position.y}`)) {
          grid.set(`${position.x + x}_${position.y}`, color);
        }
        newPosition = { x: position.x + x, y: position.y };
      }
    }
    if (direction === "L") {
      for (let x = 1; x < length + 1; x++) {
        if (!grid.has(`${position.x - x}_${position.y}`)) {
          grid.set(`${position.x - x}_${position.y}`, color);
        }
        newPosition = { x: position.x - x, y: position.y };
      }
    }
    if (direction === "D") {
      for (let y = 1; y < length + 1; y++) {
        if (!grid.has(`${position.x}_${position.y + y}`)) {
          grid.set(`${position.x}_${position.y + y}`, color);
        }
        newPosition = { x: position.x, y: position.y + y };
      }
    }
    if (direction === "U") {
      for (let y = 1; y < length + 1; y++) {
        if (!grid.has(`${position.x}_${position.y - y}`)) {
          grid.set(`${position.x}_${position.y - y}`, color);
        }
        newPosition = { x: position.x, y: position.y - y };
      }
    }
    position = { ...newPosition };
  }

  console.log(grid.size);

  const positions = Array.from(grid, ([key, value]) => ({
    position: key.split("_").map(Number),
    value,
  }));
  const newGrid: Map<string, string> = new Map(grid);
  const minY = Math.min(...positions.map((e) => e.position[1]));
  const maxY = Math.max(...positions.map((e) => e.position[1]));
  const minX = Math.min(...positions.map((e) => e.position[0]));
  const maxX = Math.max(...positions.map((e) => e.position[0]));

  for (let y = minY; y <= maxY; y++) {
    let last: Pos | null = null;
    let hasPassedEdge: boolean = false;
    for (let x = minX; x <= maxX; x++) {
      if (
        grid.has(`${x}_${y}`) &&
        (last === null || !grid.has(`${last.x}_${last.y}`))
      ) {
        hasPassedEdge = !hasPassedEdge;
      } else if (!grid.has(`${x}_${y}`) && hasPassedEdge) {
        newGrid.set(`${x}_${y}`, "?");
      }
      last = { x, y };
    }
  }
  console.log(newGrid);
  return newGrid.size;
};

console.time("part 1");
// 26735 too low
// 26104 too low
// 38745 too high
// 39011
console.log("part 1", part1());
console.timeEnd("part 1");

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
