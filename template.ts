import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: string = getData(date, test);

console.time("part 1");
console.timeEnd("part 1");
// console.log(part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
