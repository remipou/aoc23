import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: number[] = getData(date, test)
  .replace(/[^0-9]+/g, "|")
  .split("|")
  .filter((e) => e !== "")
  .map(Number);
const length = data.length / 2;
const times: number[] = data.slice(0, length);
const distances: number[] = data.slice(length);

console.time("part 1");

const results: number[] = [];

const calculateDistance = (speed: number, time: number): number => speed * time;

for (let i = 0; i < length; i++) {
  console.log("*************", i);
  const time = times[i];
  const record = distances[i];
  const wins: number[] = [];
  for (let speed = 0; speed < time + 1; speed++) {
    const travelTime = time - speed;
    const distance = calculateDistance(speed, travelTime);
    if (distance > record) {
      wins.push(speed);
    }
  }
  results.push(wins.length);
}

console.timeEnd("part 1");
console.log(
  "part 1",
  results.reduce((prev, curr) => prev * curr, 1)
);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
