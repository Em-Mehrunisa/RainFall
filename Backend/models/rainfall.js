import mongoose from "mongoose";

const rainfallSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    am1: {
      type: Number,
      required: true,
    },
    am2: {
      type: Number,
      required: true,
    },
    pm1: {
      type: Number,
      required: true,
    },
    pm2: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Rainfall = mongoose.model("Rainfall", rainfallSchema);
