import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import { generateApiKey } from "../utils/generateAPIKey.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const apiKey = generateApiKey();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      apiKey,
      isAdmin: isAdmin ? true : false,
    });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      apiKey: user.apiKey,
      userData: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
