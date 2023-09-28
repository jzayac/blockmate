import NodeCache, { Key, Callback } from "node-cache";

export  interface ICache {
  get<T>(key: Key): T | undefined;
  set<T>(key: Key, value: T): boolean;
}

let cache: ICache;
if (process.env.NODE_ENV === "develop") {
  cache = {
    get<T>(key: Key): T | undefined {
      return undefined;
    },
    set<T>(key: Key, value: T): boolean {
      return true;
    },
  };
} else {
  cache = new NodeCache({ stdTTL: 60 * 10, checkperiod: 60 });
}

export default cache;
