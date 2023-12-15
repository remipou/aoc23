import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type Row = Array<"#" | ".">;
type Grid = Array<Row>;

const data: Array<Array<Array<string>>> = getData(date, test)
  .split("\n\n")
  .map((e) => e.split("\n").map((r) => r.split("")));

const visualize = (grid: Grid): void =>
  console.log(grid.map((r) => r.join("")).join("\n") + "\n");

// data.map((g) => visualize(g as Grid));

console.time("part 1");

const getDifferences = (a1: Row, a2: Row): number => {
  let diff: number = 0;
  for (let i = 0; i < a1.length + 1; i++) {
    if (a1[i] !== a2[i]) {
      diff++;
    }
  }
  return diff;
};

const findReflection = (grid: Grid): number => {
  outerLoop: for (let testIndex = 1; testIndex < grid.length; testIndex++) {
    innerLoop: for (
      let i = 1;
      testIndex - i >= 0 && testIndex + i - 1 < grid.length;
      i++
    ) {
      const r1: Row = grid[testIndex - i];
      const r2: Row = grid[testIndex + i - 1];
      const diff: number = getDifferences(r1, r2);
      if (diff !== 0) {
        continue outerLoop;
      }
    }
    return testIndex;
  }
  return 0;
};

const findReflection2 = (grid: Grid): number => {
  console.log("\n=======\n");
  visualize(grid);
  console.log("\n*****\n");
  outerLoop: for (let testIndex = 1; testIndex < grid.length; testIndex++) {
    let sumDiff: number = 0;
    innerLoop: for (
      let i = 1;
      testIndex - i >= 0 && testIndex + i - 1 < grid.length;
      i++
    ) {
      const r1: Row = grid[testIndex - i];
      const r2: Row = grid[testIndex + i - 1];
      const diff: number = getDifferences(r1, r2);
      sumDiff += diff;
      console.log(r1.join(""), " => ", r2.join(""), " => ", diff);
      if (diff > 1 || sumDiff > 1) {
        continue outerLoop;
      }
    }
    return testIndex;
  }
  return 0;
};

// i index from to
// 1  1    0   1
// 1  2   1   2
// 2  2   0  3
// 1  3  2   3
// 2  3  1   4

const transpose = (grid: Grid): Grid =>
  grid[0].map((_, i) => grid.map((row) => row[i]));

const rotate = (grid: Grid, direction: boolean = true): Grid => {
  if (direction) return transpose(grid);
  let newGrid: Grid = deepCopy(grid);
  for (let i = 0; i < 3; i++) {
    newGrid = transpose(newGrid);
  }
  return newGrid;
};

// console.log("rotate");
// const rotated = rotate(data[0] as Grid);
// visualize(rotated);
// console.log("rotate back");
// const rotatedBack = rotate(rotated, false);
// visualize(rotatedBack);

const findHorizontalReflection = (
  grid: Grid,
  isPart2: boolean = false
): number => (isPart2 ? findReflection2(grid) : findReflection(grid));

const findVerticalReflection = (grid: Grid, isPart2: boolean = false): number =>
  isPart2 ? findReflection2(rotate(grid)) : findReflection(rotate(grid));

const processGrid = (grid: Grid): number =>
  findVerticalReflection(grid) + 100 * findHorizontalReflection(grid);

console.timeEnd("part 1");
console.log(
  "part1",
  data.map((g) => processGrid(g as Grid)).reduce((prev, curr) => prev + curr, 0)
);

console.time("part 2");

const deepCopy = (grid: Grid): Grid =>
  grid.map(function (row: Row) {
    return row.slice();
  });

// console.log(
//   data.map((g) => [
//     findVerticalReflection(g as Grid, true),
//     findHorizontalReflection(g as Grid, true),
//   ])
// );
const processGrid2 = (grid: Grid): number =>
  findVerticalReflection(grid, true) +
  100 * findHorizontalReflection(grid, true);

const processPart2 = (grid: Grid, index: number): number => {
  const originalHorizontalReflection = findHorizontalReflection(grid);
  const originalVerticalReflection = findVerticalReflection(grid);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const newGrid = deepCopy(grid);
      const elt = grid[i][j];
      newGrid[i][j] = elt === "#" ? "." : "#";
      const horizontalReflection = findHorizontalReflection(newGrid);
      if (
        horizontalReflection > 0 &&
        horizontalReflection !== originalHorizontalReflection
      ) {
        console.log(
          index,
          "smudge at (horizontal reflection)",
          { x: j, y: i },
          horizontalReflection
        );
        return horizontalReflection * 100;
      }
    }
  }
  console.log("continuing");

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const newGrid = deepCopy(grid);
      const elt = grid[i][j];
      newGrid[i][j] = elt === "#" ? "." : "#";
      const verticalReflection = findVerticalReflection(newGrid);
      if (
        verticalReflection > 0 &&
        verticalReflection !== originalVerticalReflection
      ) {
        console.log(
          index,
          "smudge at (vertical reflection)",
          { x: j, y: i },
          verticalReflection
        );
        return verticalReflection;
      }
    }
  }
  console.log(index, "no reflection");
  return 0;
};

console.timeEnd("part 2");

console.log(
  "part2",
  data
    .map((g) => processGrid2(g as Grid))
    .reduce((prev, curr) => prev + curr, 0)
);

console.log(
  "part2",
  data
    .map((g, i) => processPart2(g as Grid, i))
    .reduce((prev, curr) => prev + curr, 0)
);
