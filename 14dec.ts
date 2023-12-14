import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type T = string[][];

const data: T = getData(date, test)
  .split("\n")
  .map((l) => l.split(""));

const deepCopy = (a: T): T => a.map((b: string[]) => b.slice());

const visualize = (d: T): void =>
  console.log(d.map((r) => r.join("")).join("\n") + "\n");

console.time("part 1");

const slideNorth = (d: T): T => {
  const d2 = deepCopy(d);
  for (let row = 0; row < d2.length; row++) {
    for (let col = 0; col < d2[row].length; col++) {
      if (d2[row][col] === "O") {
        let newRow = row;
        while (newRow > 0 && d2[newRow - 1][col] === ".") {
          d2[newRow - 1][col] = "O";
          d2[newRow][col] = ".";
          newRow--;
        }
      }
    }
  }
  return d2;
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
console.timeEnd("part 2");
// console.log(part2);
