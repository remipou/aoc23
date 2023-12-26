import getData from "./data";

const [_ts, _file, date, test] = process.argv;

const connections = new Map<string, number>();

const connect = (a: string, b: string): void => {
  if (a < b) {
    [a, b] = [b, a];
  }
  connections.set(`${a}_${b}`, 1);
};

const isConnected = (a: string, b: string): boolean => {
  if (a < b) {
    [a, b] = [b, a];
  }
  return connections.has(`${a}_${b}`);
};

const data: any = getData(date, test)
  .split("\n")
  .map((l) =>
    l.split(": ").map((e) => {
      console.log(e);
    })
  );
// for (let j = data.length; j < data; j++) {}

// console.log(connections);

console.time("part 1");
console.timeEnd("part 1");
console.log("part1");

console.time("part 2");
console.timeEnd("part 2");
console.log("part2");
