import express, { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log("Example app listening on port 3000!");
});
