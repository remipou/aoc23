import getData from "./data";
import prettyLog from "./helpers/log";

const [_ts, _file, date, test] = process.argv;
const lines = getData(date, test).split("\n");
const data = lines.map((row) => row.split(""));

const maxX = lines.length - 1;
const maxY = data.length - 1;

console.time("part 1");

const isValidSymbol = (e: any) => isNaN(e) && e !== ".";

const isCharAdjacentToASymbol = (c: string, x: number, y: number): boolean => {
  const xStart = x > 0 ? x - 1 : x;
  const xStop = x < maxX ? x + 1 : x;
  const yStart = y > 0 ? y - 1 : y;
  const yStop = y < maxY ? y + 1 : y;
  for (let r = yStart; r <= yStop; r++) {
    for (let c = xStart; c <= xStop; c++) {
      if (isValidSymbol(data[r][c])) {
        return true;
      }
    }
  }
  return false;
};

const isNumberAdjacentToASymbol = (
  n: string,
  x: number,
  y: number
): boolean => {
  for (let i = 0; i < n.length; i++) {
    if (isCharAdjacentToASymbol(n[i], x + i, y)) return true;
  }
  return false;
};

const results: Array<number> = [];

for (const y in lines) {
  const regexp = /\d+/g;
  let matches: RegExpExecArray | null;
  while ((matches = regexp.exec(lines[y])) !== null) {
    const number = matches[0];
    const x = matches.index;
    const test = isNumberAdjacentToASymbol(number, x, parseInt(y, 10));
    if (test) {
      results.push(parseInt(number, 0));
    }
  }
}
const part1 = results.reduce((prev: number, curr: number) => prev + curr, 0);
console.timeEnd("part 1");
console.log(part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
