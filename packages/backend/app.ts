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

const init = async () => {
  await Promise.all([
    redis.set("users:1", JSON.stringify({ id: 1, name: "John" })),
    redis.set("users:2", JSON.stringify({ id: 2, name: "Jane" })),
  ]);
};

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/users/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await redis.get(`users:${userId}`);
    if (user) {
      res.status(200).json(JSON.parse(user));
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

redis.once("ready", async () => {
  try {
    await init();
    const result = await redis.get("users:1");
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
