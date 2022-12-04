import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: string = getData(date, test);

console.time("part 1");
const pairs: Array<Array<Array<number>>> = data
  .split("\n")
  .map((r) => r.split(",").map((s) => s.split("-").map((e) => Number(e))));

const fullyContains = (a: Array<number>, b: Array<number>): boolean =>
  (a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1]);

const part1: number = pairs
  .map((p) => fullyContains(p[0], p[1]))
  .filter((e) => e).length;

console.timeEnd("part 1");
console.log(part1);

console.time("part 2");
const makeRange = (a: Array<number>): Array<number> =>
  [...Array(1 + a[1] - a[0]).keys()].map((e) => a[0] + e);

const overlaps = (a: Array<number>, b: Array<number>): boolean =>
  makeRange(a).some((e) => makeRange(b).includes(e));

const part2: number = pairs
  .map((p) => overlaps(p[0], p[1]))
  .filter((e) => e).length;

console.timeEnd("part 2");
console.log(part2);
