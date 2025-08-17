import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rainfallRouter from "./routes/rainfall.js";

dotenv.config({ override: true });

const url = process.env.MONGODB_URL;

const app = express();

// Only connect to MongoDB if not in test environment
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(url);

  // Hold onto collection
  const conn = mongoose.connection;
  conn.on("open", () => {
    console.log("connected...");
  });
}

// Hey! I want to use JSON
app.use(express.json());

// For all the rainfall requests redirect it to rainfall.js file
app.use("/rainfall", rainfallRouter);

app.listen(3000, () => {
  console.log("Server started");
});

export default app;
