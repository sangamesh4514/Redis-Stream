import Redis from "ioredis";
import * as dummyData from "./dummy";

let clients: { [k: string]: any } = {};

let connectionTimeout: any;
let redisInterval: any;

export const init = async () => {
  const cacheInstance = new Redis();
  clients.redis = cacheInstance;
  instanceEventListeners(cacheInstance);
};

export const startStream = () => {
  let i = 0;
  redisInterval = setInterval(async () => {
    let arr: any = [...dummyData.dummy];

    let random = arr[i];
    //console.log(random);
    if (random) {
      let a = await clients.redis.xadd(
        "mystream",
        "MAXLEN",
        "50",
        "*",
        "event",
        JSON.stringify(random)
      );
      console.log(a);
    }
    let b = await clients.redis.xlen("mystream");
    console.log(b);
    i = i + 1;
    if (i >= dummyData.dummy.length) {
      stopStream();
    }
    console.log("random event", i);
  }, 0);
};

export const stopStream = () => {
  clearInterval(redisInterval);
};

let logger = {
  info: (str: any) => console.log(str),
};

function instanceEventListeners(conn: any) {
  conn.on("connect", () => {
    logger.info("CacheStore - Connection status: connected");
    clearTimeout(connectionTimeout);
  });

  conn.on("end", () => {
    logger.info("CacheStore - Connection status: disconnected");
    throwTimeoutError();
  });

  conn.on("reconnecting", () => {
    logger.info("CacheStore - Connection status: reconnecting");
    clearTimeout(connectionTimeout);
  });

  conn.on("error", (err: any) => {
    logger.info(`CacheStore - Connection status: error ${err} `);
    throwTimeoutError();
  });
}

function throwTimeoutError() {
  connectionTimeout = setTimeout(() => {
    throw new Error("connection time out error");
  }, 1000);
}
