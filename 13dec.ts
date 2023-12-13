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

const findReflection = (grid: Grid, multiplicator: number = 1): number => {
  outerLoop: for (let testIndex = 1; testIndex < grid.length; testIndex++) {
    innerLoop: for (
      let i = 1;
      testIndex - i >= 0 && testIndex + i - 1 < grid.length;
      i++
    ) {
      if (grid[testIndex - i].join("") != grid[testIndex + i - 1].join("")) {
        continue outerLoop;
      }
    }
    return multiplicator * testIndex;
  }
  return 0;
};

const transpose = (grid: Grid): Grid =>
  grid[0].map((_, i) => grid.map((row) => row[i]));

const rotate = (grid: Grid, direction: boolean = true): Grid => {
  if (direction) return transpose(grid);
  let newGrid: Grid = grid.slice();
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

const findHorizontalReflection = (grid: Grid): number =>
  findReflection(grid, 100);

const findVerticalReflection = (grid: Grid): number =>
  findReflection(rotate(grid));

const processGrid = (grid: Grid): number =>
  findVerticalReflection(grid) + findHorizontalReflection(grid);

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

const processPart2 = (grid: Grid): number => {
  const originalHorizontalReflection = findReflection(grid);
  const originalVerticalReflection = findReflection(rotate(grid));
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const newGrid = deepCopy(grid);
      const elt = grid[i][j];
      newGrid[i][j] = elt === "#" ? "." : "#";
      const horizontalReflection = findReflection(newGrid);
      if (
        horizontalReflection > 0 &&
        horizontalReflection !== originalHorizontalReflection
      ) {
        console.log(
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
      const verticalReflection = findReflection(rotate(newGrid));
      if (
        verticalReflection > 0 &&
        verticalReflection !== originalVerticalReflection
      ) {
        console.log(
          "smudge at (vertical reflection)",
          { x: j, y: i },
          verticalReflection
        );
        return verticalReflection;
      }
    }
  }
  console.log("no reflection");
  return 0;
};

console.timeEnd("part 2");
console.log(data.map((g) => processPart2(g as Grid)));
console.log(
  "part2",
  data
    .map((g) => processPart2(g as Grid))
    .reduce((prev, curr) => prev + curr, 0)
);
