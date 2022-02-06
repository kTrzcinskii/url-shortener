require("dotenv").config();
require("express-async-errors");
import express, { Response } from "express";
import cors from "cors";
import shortUrlRouter from "./routes/shorUrl";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (_, res: Response) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use("/api/shorturl", shortUrlRouter);

// Your first API endpoint
app.get("/api/hello", function (_, res: Response) {
  res.json({ greeting: "hello API" });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {}
};

start();
