import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: Universe = getData(date, test)
  .split("\n")
  .map((l) => l.split(""));

type Universe = string[][];

console.time("part 1");

const getEmptyRows = (universe: Universe): number[] => {
  const empty: number[] = [];
  for (let i = 0; i < universe.length; i++) {
    const row = universe[i];
    if (row.every((e) => e === ".")) {
      empty.push(i);
    }
  }
  return empty;
};

const getEmptyColumns = (universe: Universe): number[] => {
  const empty: number[] = [];
  for (let j = 0; j < universe[0].length; j++) {
    let isEmpty: boolean = true;
    for (let i = 0; i < universe.length; i++) {
      if (universe[i][j] !== ".") {
        isEmpty = false;
      }
    }
    if (isEmpty) empty.push(j);
  }
  return empty;
};

const emptyBetween = (empty: number[], a: number, b: number): number => {
  if (a > b) {
    [b, a] = [a, b];
  }
  return empty.filter((e) => e > a && e < b).length;
};

const giveName = (data: Universe): { universe: Universe; count: number } => {
  let named: Universe = [];
  let counter: number = 0;
  for (let i = 0; i < data.length; i++) {
    let replaced: string[] = [];
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === "#") {
        counter++;
        replaced[j] = counter.toString();
      } else {
        replaced[j] = data[i][j];
      }
    }
    named.push(replaced);
  }
  return { universe: named, count: counter };
};

const getAddress = (galaxy: string): { x: number; y: number } => {
  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      if (universe[i][j] === galaxy) {
        return { x: j, y: i };
      }
    }
  }
  return { x: 0, y: 0 };
};

const getDistance = (g1: string, g2: string): number => {
  const a1 = getAddress(g1);
  const a2 = getAddress(g2);
  const extraRows = emptyBetween(emptyRows, a1.y, a2.y);
  const extraColumns = emptyBetween(emptyColumns, a1.x, a2.x);
  let x1: number, x2: number, y1: number, y2: number;
  if (a1.x >= a2.x) {
    x1 = a1.x + extraRows;
    x2 = a2.x;
  } else {
    x1 = a1.x;
    x2 = a2.x + extraRows;
  }
  if (a1.y >= a2.y) {
    y1 = a1.y + extraColumns;
    y2 = a2.y;
  } else {
    y1 = a1.y;
    y2 = a2.y + extraColumns;
  }
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const visualize = (universe: Universe) =>
  console.log(universe.map((l) => l.join("")).join("\n"));

const { universe, count } = giveName(data);
// visualize(universe);
const paths = new Map<string, number>();
const emptyRows = getEmptyRows(universe);
const emptyColumns = getEmptyColumns(universe);
// console.log("emptyRows", emptyRows);
// console.log("emptyColumns", emptyColumns);

for (let i in [...Array(count).keys()]) {
  for (let j in [...Array(count).keys()]) {
    if (i === j) continue;
    const g1 = `${parseInt(i) + 1}`;
    const g2 = `${parseInt(j) + 1}`;
    const key = [parseInt(i) + 1, parseInt(j) + 1]
      .sort()
      .reduce(
        (prev, curr, index) => (index === 0 ? `${curr}` : `${prev}-${curr}`),
        ""
      );
    if (paths.has(key)) continue;
    paths.set(key, getDistance(g1, g2));
  }
}
// console.log(paths, Array.from(paths).length);
console.timeEnd("part 1");
console.log(
  "part1",
  [...paths.values()].reduce((prev: number, curr: number) => prev + curr, 0)
);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
