import lodash from "lodash";

(globalThis as typeof globalThis & { _: typeof lodash })._ = lodash;
