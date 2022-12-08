import util from "util";

interface Log {
  (obj: any): void;
}

const prettyLog: Log = (obj: any): void => {
  console.log(
    util.inspect(obj, { showHidden: false, depth: null, colors: true })
  );
};

export default prettyLog;
