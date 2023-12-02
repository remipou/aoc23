import getData from "./data";
import prettyLog from "./helpers/log";

const [_ts, _file, date, test] = process.argv;

interface Game {
  blue: number;
  red: number;
  green: number;
}
interface Day {
  id: number;
  games: Array<Game>;
}

const handleGameString = (string: string): Game => ({
  blue: string.match(/^.*\s(\d+)\sblue.*$/)
    ? Number(string.replace(/^.*\s(\d+)\sblue.*$/, "$1"))
    : 0,
  red: string.match(/^.*\s(\d+)\sred.*$/)
    ? Number(string.replace(/^.*\s(\d+)\sred.*$/, "$1"))
    : 0,
  green: string.match(/^.*\s(\d+)\sgreen.*$/)
    ? Number(string.replace(/^.*\s(\d+)\sgreen.*$/, "$1"))
    : 0,
});

const data: Array<Day> = getData(date, test)
  .split("\n")
  .map((row) => ({
    id: Number(row.replace(/^Game\s(\d+):.*$/, "$1")),
    games: row
      .replace(/^Game\s\d+:(.*)$/, "$1")
      .split(";")
      .map(handleGameString),
  }));

const getMaxAntal = (games: Array<Game>): Game => ({
  red: Math.max(...games.map((g) => g.red)),
  blue: Math.max(...games.map((g) => g.blue)),
  green: Math.max(...games.map((g) => g.green)),
});

console.time("part 1");
const part1 = data
  .map((d: Day) => {
    const antal = getMaxAntal(d.games);
    return {
      id: d.id,
      ok: antal.red < 13 && antal.green < 14 && antal.blue < 15,
    };
  })
  .filter((e) => e.ok)
  .reduce((prev, curr) => curr.id + prev, 0);
console.log("part 1", part1);
console.timeEnd("part 1");

console.time("part 2");
const part2 = data
  .map((d: Day) => {
    const antal = getMaxAntal(d.games);
    return antal.red * antal.green * antal.blue;
  })
  .reduce((prev: number, curr: number) => curr + prev, 0);
console.timeEnd("part 2");
console.log("part 2", part2);
