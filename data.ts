import fs from "fs";

const getData = (date: string, test: string): string => {
  const path =
    test === "test" ? `./samples/${date}dec.txt` : `./data/${date}dec.txt`;
  return fs.readFileSync(path, "utf8");
};

export default getData;
