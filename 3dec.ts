import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: string = getData(date, test);

console.time("part 1");

const rucksacks: Array<Array<string>> = data
  .split("\n")
  .map((r) => [r.slice(0, r.length / 2), r.slice(r.length / 2, r.length)]);

const getCommon = (string1: string, string2: string): string => {
  for (let c in string1.split("")) {
    if (string2.includes(string1[c])) {
      return string1[c];
    }
  }
  return "";
};

const getPriority = (char: string): number => {
  const code: number = char.charCodeAt(0);
  if (code > 96) {
    return code - 96;
  } else {
    return code - 38;
  }
  return 0;
};

const commons = rucksacks.map((r) => getCommon(r[0], r[1]));
const part1 = commons.map((c) => getPriority(c)).reduce((acc, p) => acc + p, 0);

console.timeEnd("part 1");
console.log(part1);

console.time("part 2");
const groupedRucksacks = data
  .split("\n")
  .reduce(
    (acc: Array<any>, r: string, i: number) =>
      (i % 3 ? acc[acc.length - 1].push(r) : acc.push([r])) && acc,
    []
  );

const getBadge = (rucksack: Array<string>): string => {
  const [string1, string2, string3] = rucksack;
  for (let c in string1.split("")) {
    if (string2.includes(string1[c]) && string3.includes(string1[c])) {
      return string1[c];
    }
  }
  return "";
};

const badges: Array<string> = groupedRucksacks.map((r) => getBadge(r));
const part2: number = badges
  .map((c) => getPriority(c))
  .reduce((acc, p) => acc + p, 0);

console.timeEnd("part 2");
console.log(part2);
