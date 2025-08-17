import express from "express";
import { Alien } from "../models/alien.js";

const router = express.Router();

// For database do not use a normal request use an async request
router.get("/", async (req, res) => {
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (error) {
    res.send("Error", +error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const aliens = await Alien.findById(req.params.id);
    res.json(aliens);
  } catch (error) {
    res.send("Error", +error);
  }
  res.send("Get Request");
});

router.post("/", async (req, res) => {
  const alien = new Alien({
    name: req.body.name,
    tech: req.body.tech,
    sub: req.body.sub,
  });

  try {
    const a1 = await alien.save();
    res.json(a1);
  } catch (error) {
    res.send("Error" + error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    alien.sub = req.body.sub;
    const a1 = await alien.save();
    res.json(a1);
  } catch (error) {
    res.send("Error" + error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedAlien = await Alien.deleteOne({ _id: req.params.id });
    if (deletedAlien.deletedCount === 0) {
      return res.status(404).json({ message: "Alien not found" });
    }
    res.json({ message: "Alien deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting alien", error: error.message });
  }
});

export default router;
