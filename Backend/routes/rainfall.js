import express from "express";
import { Rainfall } from "../models/rainfall.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";
import { requestLogger } from "../middleware/requestLogger.js";

const router = express.Router();

router.use(apiKeyAuth, requestLogger);
/**
 * 1. Rainfall for a specified day (all locations)
 *    Example: GET /rainfall/day/2023-10-01
 */
router.get("/day/:date", async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const data = await Rainfall.find({ date });
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching rainfall", error: error.message });
  }
});

/**
 * 2. Rainfall for a single specified location (all days)
 *    Example: GET /rainfall/location/Erean
 */
router.get("/location/:area", async (req, res) => {
  try {
    const data = await Rainfall.find({ area: req.params.area });
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching rainfall", error: error.message });
  }
});

/**
 * 3. Rainfall for a specified day for a single specified location
 *    Example: GET /rainfall/location/Erean/day/2023-10-01
 */
router.get("/location/:area/day/:date", async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const data = await Rainfall.findOne({ area: req.params.area, date });
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching rainfall", error: error.message });
  }
});

/**
 * 4. Rainfall for all days, all locations
 *    Example: GET /rainfall/all
 */
router.get("/all", async (req, res) => {
  try {
    const data = await Rainfall.find();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching rainfall", error: error.message });
  }
});

/**
 * Admin-only (create, update, delete)
 */
router.post("/", async (req, res) => {
  try {
    const rainfall = new Rainfall(req.body);
    const saved = await rainfall.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error saving rainfall", error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updated = await Rainfall.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating rainfall", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Rainfall.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting rainfall", error: error.message });
  }
});

export default router;
