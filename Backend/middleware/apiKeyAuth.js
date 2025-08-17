import { User } from "../models/user.js";

export async function apiKeyAuth(req, res, next) {
  try {
    const apiKey = (req.header("x-api-key") || req.query.apiKey || "").trim();

    if (!apiKey) {
      return res
        .status(401)
        .json({ message: "Unauthorized: API key required" });
    }
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid API key" });
    }
    req.user = {
      id: user._id,
      email: user.email,
      role: user.isAdmin === true ? "Admin" : "User",
    };

    next();
  } catch (error) {
    console.error("API Key Auth Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
