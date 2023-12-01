import getData from "./data";

const [_ts, _file, date, test] = process.argv;
let data: string = getData(date, test);

console.time("part 1");

const getDigits = (string: string): Array<number> | undefined =>
  string.match(/\d/g)?.map((e) => Number(e));

const part1 = data
  .split("\n")
  .map((s) => {
    const digits = getDigits(s);
    if (digits) {
      return 10 * digits[0] + digits[digits.length - 1];
    }
    return 0;
  })
  .reduce((prev: number, current: number) => prev + current, 0);
console.log(part1);
console.timeEnd("part 1");

console.time("part 2");

const words = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

if (test) {
  data = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
}
const reg = new RegExp(
  /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
);

const getDigits2 = (string: string) => {
  let m: RegExpExecArray | null;
  const results: Array<string> = [];
  while ((m = reg.exec(string)) !== null) {
    if (m.index === reg.lastIndex) {
      reg.lastIndex++;
    }
    results.push(m[1]);
  }
  return results.map((r) =>
    isNaN(r as any) ? words[r as keyof typeof words] : parseInt(r, 10)
  );
};

const part2 = data
  .split("\n")
  .map((s) => {
    const digits = getDigits2(s);
    if (digits) {
      return 10 * digits[0] + digits[digits.length - 1];
    }
    return 0;
  })
  .reduce((prev: number, current: number) => prev + current, 0);

console.timeEnd("part 2");
console.log(part2);
