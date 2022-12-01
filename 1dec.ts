// npx ts-node 1dec.ts
const fs = require("fs");
const data: string = fs.readFileSync("./data/1dec.txt", "utf8");
// const data: string = fs.readFileSync("./samples/1dec.txt", "utf8");
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
