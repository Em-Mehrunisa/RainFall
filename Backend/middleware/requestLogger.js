export function requestLogger(req, res, next) {
  const log = {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    date: new Date().toISOString(),
    apiKey: req.header("x-api-key") || "none",
    path: req.originalUrl,
    method: req.method,
  };

  console.log("API Request Log:", log);
  next();
}
