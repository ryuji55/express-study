import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

const app = express();

const redis = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

redis.once("ready", () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log("Example app listening on port 3000!");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

redis.on("error", (err: Error) => {
  console.error(err);
  process.exit(1);
});
