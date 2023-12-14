import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type T = string[][];

const data: T = getData(date, test)
  .split("\n")
  .map((l) => l.split(""));

const stringify = (d: T): string => d.map((r) => r.join("")).join("\n") + "\n";
const visualize = (d: T): void => console.log(stringify(d));
const deepCopy = (d: T): T => d.map((row: string[]) => row.slice());

console.time("part 1");

const slideNorth = (d0: T): T => {
  const d = deepCopy(d0);
  for (let row = 0; row < d.length; row++) {
    for (let col = 0; col < d[row].length; col++) {
      if (d[row][col] === "O") {
        let newRow = row;
        while (newRow > 0 && d[newRow - 1][col] === ".") {
          d[newRow - 1][col] = "O";
          d[newRow][col] = ".";
          newRow--;
        }
      }
    }
  }
  return d;
};

const slideSouth = (d0: T): T => {
  const d = deepCopy(d0);
  for (let row = d.length - 1; row >= 0; row--) {
    for (let col = 0; col < d[row].length; col++) {
      if (d[row][col] === "O") {
        let newRow = row;
        while (newRow < d.length - 1 && d[newRow + 1][col] === ".") {
          d[newRow + 1][col] = "O";
          d[newRow][col] = ".";
          newRow++;
        }
      }
    }
  }
  return d;
};

const slideEast = (d0: T): T => {
  const d = deepCopy(d0);
  for (let row = 0; row < d.length; row++) {
    for (let col = d[row].length - 1; col >= 0; col--) {
      if (d[row][col] === "O") {
        let newCol = col;
        while (newCol < d[row].length - 1 && d[row][newCol + 1] === ".") {
          d[row][newCol + 1] = "O";
          d[row][newCol] = ".";
          newCol++;
        }
      }
    }
  }
  return d;
};

const slideWest = (d0: T): T => {
  const d = deepCopy(d0);
  for (let row = 0; row < d.length; row++) {
    for (let col = 0; col < d[0].length; col++) {
      if (d[row][col] === "O") {
        let newCol = col;
        while (newCol > 0 && d[row][newCol - 1] === ".") {
          d[row][newCol - 1] = "O";
          d[row][newCol] = ".";
          newCol--;
        }
      }
    }
  }
  return d;
};

const getLoad = (d: T) =>
  d
    .map(
      (line, index) => (d.length - index) * line.filter((e) => e === "O").length
    )
    .reduce((prev, curr) => prev + curr, 0);

console.timeEnd("part 1");
console.log("part1", getLoad(slideNorth(data)));

console.time("part 2");

const cycle = (d: T): T => {
  let d1 = deepCopy(d);
  d1 = slideNorth(d1);
  d1 = slideWest(d1);
  d1 = slideSouth(d1);
  d1 = slideEast(d1);
  return d1;
};
const cycles = new Map<string, number>();

let d: T = deepCopy(data);
for (let i = 0; i < 4; i++) {
  visualize(d);
  d = cycle(d);
}

// console.log(cycles);

console.timeEnd("part 2");
// console.log("part2", getLoad(endState));
