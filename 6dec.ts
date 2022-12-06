import { stripVTControlCharacters } from "util";
import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: string[] = getData(date, test).split("");

const areUnique = (test: string[]): boolean =>
  test.length === [...new Set(test)].length;

const run = (packetSize: number): number => {
  let characters = packetSize - 1;
  for (let l = 0; l < data.length; l++) {
    characters++;
    const t = data.slice(l, packetSize + l);
    if (areUnique(t)) {
      break;
    }
  }
  return characters;
};

console.time("part 1");
const part1 = run(4);
console.timeEnd("part 1");
console.log(part1);

console.time("part 2");
const part2 = run(14);
console.timeEnd("part 2");
console.log(part2);
