import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type MODULE = {
  name: string;
  type: string;
  memory?: string[];
  destinations: string[];
};

type PULSE = "high" | "low";

type ITEM = {
  pulse: PULSE;
  from: string;
  to: string;
};

const data: MODULE[] = getData(date, test)
  .split("\n")
  .map((r) => r.split(" ->"))
  .map((l) => ({
    name: l[0].replace(/&|%/, ""),
    type: ["&", "%"].includes(l[0][0]) ? l[0][0] : "?",
    destinations: l[1].split(",").map((e) => e.trim()),
    memory: l[0][0] === "&" ? l[1].split(",").map((e) => "low") : undefined,
  }));

const queue: ITEM[] = [];

const sendPulse = (pulse: PULSE, from: string, to: string): void => {
  queue.push({ pulse, from, to });
};

const sendPulses = (pulse: PULSE, from: MODULE | null): void => {
  if (from === null) {
    sendPulse(pulse, "button", "broadcaster");
  } else {
    for (let i = 0; i < from.destinations.length; i++) {
      sendPulse(pulse, from.name, from.destinations[i]);
    }
  }
};

const processQueue = (): void => {
  while (queue.length) {
    const item: ITEM | undefined = queue.shift();
    if (!item) return;
    const module: MODULE | undefined = data.find((e) => e.name === item.to);
    if (module?.name === "broadcaster") {
      for (let i = 0; i < module.destinations.length; i++) {
        sendPulse(item.pulse, module.name, module.destinations[i]);
      }
    } else if (module?.type === "%" && item.pulse === "low") {
      const state = states.get(module.name);
      const newState = state === "high" ? "low" : "high";
      states.set(module.name, newState);
      for (let i = 0; i < module.destinations.length; i++) {
        sendPulse(newState, module.name, module.destinations[i]);
      }
    } else if (module?.type === "&") {
      const index = data.findIndex((e) => e.name === module.name);
      console.log("item", item);
      console.log("module", module);
      const destIndex = module.destinations.findIndex((e) => e === item.from);
      console.log(index, destIndex);
    }
  }
};

const pushButton = (): void => {
  sendPulses("low", null);
};

console.time("part 1");
const states: Map<string, string> = new Map(data.map((i) => [i.name, "low"]));

console.log(data);
pushButton();
processQueue();
console.log(states);

console.timeEnd("part 1");
console.log("part1");

console.time("part 2");
console.timeEnd("part 2");
// console.log("part2");
