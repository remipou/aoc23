import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: string[] = getData(date, test).split(",");

const hashChar = (start: number, char: string): number =>
  ((start + char.charCodeAt(0)) * 17) % 256;

const hashWord = (word: string): number => {
  let start: number = 0;
  for (let i = 0; i < word.length; i++) {
    start = hashChar(start, word[i]);
  }
  return start;
};

console.time("part 1");
console.timeEnd("part 1");
console.log(
  "part 1",
  data.reduce((prev, curr) => prev + hashWord(curr), 0)
);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
