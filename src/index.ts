require("dotenv").config();
import "express-async-errors";
import express, { Response } from "express";
import cors from "cors";
import shortUrlRouter from "./routes/shorUrl";
import mongoose from "mongoose";
import errorHandler from "./middlewares/errorHandler";

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

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {}
};

start();
