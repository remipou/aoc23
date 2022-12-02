import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: string = getData(date, test);

const foods: Array<Array<number>> = data
  .split("\n\n")
  .map((f: string) => f.split("\n").map((e) => Number(e)));

console.time("part 1");
const calories: Array<number> = foods.map((f: Array<number>) =>
  f.reduce((a: number, b: number) => a + b, 0)
);
const max: number = Math.max(...calories);
console.timeEnd("part 1");
console.log(max);

console.time("part 2");
const total: number = calories
  .sort((a: number, b: number) => b - a)
  .slice(0, 3)
  .reduce((a: number, b: number) => a + b, 0);
console.timeEnd("part 2");
console.log(total);
