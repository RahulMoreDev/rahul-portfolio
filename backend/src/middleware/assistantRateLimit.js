const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;
const MAX_CLIENTS = 5000;
const clients = new Map();

function assistantRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  let bucket = clients.get(key);

  if (!bucket || now >= bucket.resetAt) {
    if (!bucket && clients.size >= MAX_CLIENTS) {
      for (const [clientKey, clientBucket] of clients) {
        if (now >= clientBucket.resetAt) clients.delete(clientKey);
      }

      if (clients.size >= MAX_CLIENTS) {
        return res
          .status(503)
          .json({ message: "The assistant is temporarily at capacity." });
      }
    }

    bucket = { count: 0, resetAt: now + WINDOW_MS };
  }

  bucket.count += 1;
  clients.set(key, bucket);

  if (bucket.count > MAX_REQUESTS) {
    res.set("Retry-After", String(Math.ceil((bucket.resetAt - now) / 1000)));
    return res
      .status(429)
      .json({ message: "Too many assistant requests. Please wait a minute." });
  }

  return next();
}

module.exports = assistantRateLimit;
