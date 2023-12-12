import getData from "./data";
import { getAllIndexes } from "./helpers";

const [_ts, _file, date, test] = process.argv;
type LINE = {
  condition: string;
  damaged: number[];
  possible?: number;
};
const data: LINE[] = getData(date, test)
  .split("\n")
  .map((l) => {
    const matches = l.match(/^([\.\?#]+)\s([\d,]+)$/);
    const condition = matches ? matches[1] : "";
    const damaged = matches ? matches[2] : "";
    // const groups = condition.match(/(.)\1*/g);
    return {
      condition, //: groups || [],
      damaged: damaged.split(",").map(Number),
    };
  });

console.time("part 1");

const part1 = (data: LINE): void => {
  const { condition, damaged } = data;
  console.log("condition", condition);
  const max = Math.max(...damaged);
  const damagedTotal = damaged.reduce((prev, curr) => curr + prev, 0);
  const length = condition.length;
  const questionsMarks = getAllIndexes(condition.split(""), "?");
  const dots = new Array(damagedTotal)
    .fill(null)
    .map((_, k) => new Array(k + 2).join("."));
  const hashs = new Array(max)
    .fill(null)
    .map((_, k) => new Array(k + 2).join("#"));
  console.log(dots, hashs);
};

part1(data[0]);

console.timeEnd("part 1");
// console.log(part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
