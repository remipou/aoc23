import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: string[] = getData(date, test).split("\n\n");
const _instructions: string[] = data[0].split("\n");
const _ratings: string[] = data[1].split("\n");

type Instr = {
  name: string;
  rules: string[];
};
type Rating = {
  x: number;
  a: number;
  m: number;
  s: number;
};
type Result = {
  accepted: boolean;
  points: number;
};

const parseInstruction = (string: string): Instr | null => {
  const matches = string.match(/([a-z]+)\{(.*)\}/);
  if (matches) {
    const name = matches[1];
    const rules = matches[2].split(",");
    return { name, rules };
  }
  return null;
};

const parseRatings = (string: string): Rating | null => {
  const matches = string.match(/^\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)\}$/);
  if (matches) {
    const x = Number(matches[1]);
    const m = Number(matches[2]);
    const a = Number(matches[3]);
    const s = Number(matches[4]);
    return { x, m, a, s };
  }
  return null;
};

const runRule = (rule: string, rating: Rating): string | null => {
  const elts: string[] = rule.split(/>|<|:/);
  if (elts.length === 1) {
    return elts[0];
  }
  if (
    (rule.indexOf(">") > -1 &&
      rating[elts[0] as keyof Rating] > Number(elts[1])) ||
    (rule.indexOf("<") > -1 &&
      rating[elts[0] as keyof Rating] < Number(elts[1]))
  ) {
    return elts[2];
  }
  return null;
};

const processRules = (rules: string[], rating: Rating): string | null => {
  for (let i = 0; i < rules.length; i++) {
    const res = runRule(rules[i], rating);
    if (res !== null) {
      return res;
    }
  }
  return null;
};

const instructions: Array<Instr | null> = _instructions.map(parseInstruction);
const ratings: Array<Rating | null> = _ratings.map(parseRatings);

const getByName = (name: string): Instr | null =>
  instructions.find((i) => i?.name === name) ?? null;

console.time("part 1");

const processRating = (rating: Rating): Result => {
  let instruction = getByName("in");
  while (1) {
    const res = processRules(instruction!.rules, rating);
    // console.log(` => ${res} `);
    if (res === "A" || res === "R") {
      return {
        points: rating.x + rating.m + rating.a + rating.s,
        accepted: res === "A",
      };
    } else if (res) {
      instruction = getByName(res);
    }
  }
  return { points: 0, accepted: false };
};
const part1 = ratings
  .map((rating) => processRating(rating!))
  .filter((r: Result) => r.accepted)
  .reduce((prev, curr) => prev + curr.points, 0);

console.timeEnd("part 1");
console.log("part 1", part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
