import getData from "./data";
import Stack, { StackItem } from "./helpers/stack";

const [_ts, _file, date, test] = process.argv;
const data: string = getData(date, test);

const setup = (arr: string): Stack[] => {
  const rows = arr.split("\n");
  const length = rows.pop()?.split("   ").length || 0;
  const crates: Stack[] = [];
  for (let i = 0; i < length; i++) {
    crates.push(new Stack());
  }

  for (let k in rows.reverse()) {
    const elts: undefined | string[] = rows[k]
      .match(/.{1,4}/g)
      ?.map((e) => e.trim());
    if (elts) {
      for (let i = 0; i < length; i++) {
        if (elts[i] !== "") {
          const s = elts[i].replace(/\[|\]/g, "");
          crates[i].push(s);
        }
      }
    }
  }
  return crates;
};

console.time("part 1");
const [arr, instructionsAsString] = data.split("\n\n");

const crates = setup(arr);

const instructions = instructionsAsString.split("\n").map((e) =>
  e
    .split(" ")
    .map((i) => Number(i))
    .filter((n: any) => !isNaN(n))
);

for (let i in instructions) {
  const [count, from, to] = instructions[i];
  if (count === 1) {
    const elt: StackItem | undefined = crates[from - 1].pop();
    if (elt) {
      crates[to - 1].push(elt);
    }
  } else {
    const elts: undefined | StackItem[] = crates[from - 1].popMultiple(count);
    if (elts) {
      for (let j = elts.length - 1; j >= 0; j--) {
        crates[to - 1].push(elts[j]);
      }
    }
  }
}

const part1 = crates
  .map((c: Stack): string => c.peek().toString())
  .reduce((acc: string, item: string): string => (acc += item), "");

console.timeEnd("part 1");
console.log(part1);

console.time("part 2");
const crates2 = setup(arr);
for (let i in instructions) {
  const [count, from, to] = instructions[i];
  if (count === 1) {
    const elt: StackItem | undefined = crates2[from - 1].pop();
    if (elt) {
      crates2[to - 1].push(elt);
    }
  } else {
    const elts: undefined | StackItem[] = crates2[from - 1].popMultiple(count);
    if (elts) {
      for (let j = 0; j < elts.length; j++) {
        crates2[to - 1].push(elts[j]);
      }
    }
  }
}
const part2 = crates2
  .map((c: Stack): string => c.peek().toString())
  .reduce((acc: string, item: string): string => (acc += item), "");

console.timeEnd("part 2");
console.log(part2);
