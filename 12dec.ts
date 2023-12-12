import getData from "./data";

const [_ts, _file, date, test] = process.argv;
type LINE = {
  condition: string[];
  damaged: number[];
  possible?: number;
};
const data: LINE[] = getData(date, test)
  .split("\n")
  .map((l) => {
    const matches = l.match(/^([\.\?#]+)\s([\d,]+)$/);
    const condition = matches ? matches[1] : "";
    const damaged = matches ? matches[2] : "";
    const groups = condition.match(/(.)\1*/g);
    return {
      condition: groups || [],
      damaged: damaged.split(",").map(Number),
    };
  });

console.log(data);

console.time("part 1");

const part1 = (data: LINE): LINE => {
  const { condition, damaged } = data;

  return { condition, damaged };
};

console.timeEnd("part 1");
// console.log(part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
