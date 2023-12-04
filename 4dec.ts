import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: Array<any> = getData(date, test)
  .split("\n")
  .map((e) => e.replace(/^Card\s+\d+:(.*)$/, "$1"))
  .map((e) =>
    e
      .split("|")
      .map((i) => i.trim())
      .map((e) => e.split(" ").filter((e) => e.length))
  );

console.time("part 1");
const calculatePoints = (
  winningCards: Array<string>,
  myCards: Array<string>
): number => {
  const matches = myCards.filter((c) => winningCards.includes(c));
  if (matches.length === 0) return 0;
  let p = 1;
  for (let i = 1; i < matches.length; i++) {
    p *= 2;
  }
  return p;
};
const part1 = data
  .map((e) => calculatePoints(e[0], e[1]))
  .reduce((prev, curr) => prev + curr, 0);

console.timeEnd("part 1");
console.log(part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
