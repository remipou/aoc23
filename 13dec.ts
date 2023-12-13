import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const raw = getData(date, test);
const data: any = raw
  .split("\n\n")
  .map((e) => e.split("\n").map((r) => r.split("")));

type Row = Array<"#" | ".">;
type Grid = Array<Row>;

console.log(raw);

console.time("part 1");

const findHorizontalReflection = (grid: Grid): number => {
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
    return 100 * testIndex;
  }
  return 0;
};

const findVerticalReflection = (grid: Grid): number => {
  return 0;
};

console.log("h0", findHorizontalReflection(data[0]));
console.log("h1", findHorizontalReflection(data[1]));
console.log("v0", findVerticalReflection(data[0]));
console.log("v1", findVerticalReflection(data[1]));

console.timeEnd("part 1");
// console.log(part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
