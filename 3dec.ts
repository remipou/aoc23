import getData from "./data";

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
console.log("*************\n");

console.time("part 2");

const getAdjacentsNumbers = (x: number, y: number): Array<number> => {
  const xStart = x > 0 ? x - 1 : x;
  const xStop = x < maxX ? x + 1 : x;
  const yStart = y > 0 ? y - 1 : y;
  const yStop = y < maxY ? y + 1 : y;
  const res: Array<number> = [];
  for (let r = yStart; r <= yStop; r++) {
    for (let c = xStart; c <= xStop; c++) {
      if (!isNaN(data[r][c] as any)) {
        const regexp = /\d+/g;
        let matches: RegExpExecArray | null;
        while ((matches = regexp.exec(lines[r])) !== null) {
          const matchXFrom = matches.index;
          const matchXTo = matches.index + matches[0].length - 1;
          if (x >= matchXFrom - 1 && x <= matchXTo + 1) {
            res.push(parseInt(matches[0], 0));
          }
        }
      }
    }
  }
  return [...new Set(res)];
};
const results2: Array<number> = [];

for (const y in lines) {
  const regexp = /\*/g;
  let matches: RegExpExecArray | null;
  while ((matches = regexp.exec(lines[y])) !== null) {
    const x = matches.index;
    const numbers = getAdjacentsNumbers(x, parseInt(y, 10));
    if (numbers.length === 2) {
      // console.log(`gear at line ${y}, col ${x}: ${numbers[0]} & ${numbers[1]}`);
      results2.push(numbers[0] * numbers[1]);
      // } else {
      // console.log(
      //   `gear at line ${y}, col ${x}: not valid, ${numbers.length} adjacent numbers`
      // );
    }
  }
}

const part2 = results2.reduce((prev: number, curr: number) => prev + curr, 0);
console.timeEnd("part 2");
console.log(part2);
