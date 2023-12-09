import getData from "./data";
import LargeMap from "large-map";

const [_ts, _file, date, test] = process.argv;

const data: any = getData(date, test)
  .split("\n\n")
  .map((i) => i.split("\n").map((e) => e.split(":").map((t) => t.trim())));

console.time("part 1");

let seeds: Array<number> = [];

const parser = (input: Array<string>): Array<Array<number>> =>
  input.map((line) => line[0].split(" ").map(Number));

const mapper = (data: Array<Array<number>>): LargeMap<any, any> => {
  const m = new LargeMap();
  for (let i in data) {
    const length = data[i][2];
    for (let j = 0; j < length; j++) {
      try {
        m.set(
          (j + data[i][1]) as unknown as number,
          (j + data[i][0]) as unknown as number
        );
      } catch (e) {
        console.log(e);
        console.log(j, data[i][1], data[i][0]);
      }
    }
  }
  return m;
};

let seedToSoil: LargeMap<number, number> = new LargeMap(),
  soilToFertilizer: LargeMap<number, number> = new LargeMap(),
  fertilizerToWater: LargeMap<number, number> = new LargeMap(),
  waterToLight: LargeMap<number, number> = new LargeMap(),
  lightToTemperature: LargeMap<number, number> = new LargeMap(),
  temperatureToHumidity: LargeMap<number, number> = new LargeMap(),
  humidityToLocation: LargeMap<number, number> = new LargeMap();

for (let d = 0; d < 8; d++) {
  const title = data[d][0][0];
  const parsedData = title === "seeds" ? [] : parser(data[d].slice(1));
  switch (title) {
    case "seeds":
      seeds = data[d][0][1].split(" ").map(Number);
      break;
    case "seed-to-soil map":
      seedToSoil = mapper(parsedData);
      break;
    case "soil-to-fertilizer map":
      soilToFertilizer = mapper(parsedData);
      break;
    case "fertilizer-to-water map":
      fertilizerToWater = mapper(parsedData);
      break;
    case "water-to-light map":
      waterToLight = mapper(parsedData);
      break;
    case "light-to-temperature map":
      lightToTemperature = mapper(parsedData);
      break;
    case "temperature-to-humidity map":
      temperatureToHumidity = mapper(parsedData);
      break;
    case "humidity-to-location map":
      humidityToLocation = mapper(parsedData);
      break;
  }
}

const getter = (
  myMap: LargeMap<number, number> = new LargeMap(),
  key: number
): number => myMap.get(key) || key;

let result: number = 0;
for (const i in seeds) {
  console.log(i, seeds.length);
  const seed = seeds[i];
  const soil = getter(seedToSoil, seed);
  // const fertilizer = getter(soilToFertilizer, soil);
  // const water = getter(fertilizerToWater, fertilizer);
  // const light = getter(waterToLight, water);
  // const temperature = getter(lightToTemperature, light);
  // const humidity = getter(temperatureToHumidity, temperature);
  // const location = getter(humidityToLocation, humidity);
  // console.log({
  //   seed,
  //   soil,
  //   fertilizer,
  //   water,
  //   light,
  //   temperature,
  //   humidity,
  //   location,
  // });
  if (result === 0 || soil < result) {
    result = soil;
  }
}

console.timeEnd("part 1");
console.log("part1", result);
// console.log("part1", Math.min(...results));

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
