import dotenv from "dotenv";
dotenv.config();

const apiKeys = process.env.API_KEYS?.split(",") || [];
const adminKey = process.env.ADMIN_API_KEY;

export function apiKeyAuth(req, res, next) {
  const key = req.header("x-api-key");

  if (!key) {
    return res.status(401).json({ message: "API key required" });
  }

  // Check if it's admin
  if (key === adminKey) {
    req.isAdmin = true;
    return next();
  }

  // Check normal user keys
  if (apiKeys.includes(key)) {
    req.isAdmin = false;
    return next();
  }

  return res.status(403).json({ message: "Invalid API key" });
}
