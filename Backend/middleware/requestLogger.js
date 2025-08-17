export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const log = {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      date: new Date().toISOString(),
      apiKey: req.header("x-api-key") || "none",
      path: req.originalUrl,
      method: req.method,
      status: res.statusCode,
      responseTime: `${Date.now() - start}ms`,
    };

    console.log("API Request Log:", log);
  });

  next();
}
