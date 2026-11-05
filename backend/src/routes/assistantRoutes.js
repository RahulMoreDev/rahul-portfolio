const express = require("express");
const { createAssistantReply } = require("../controllers/assistantController");
const assistantRateLimit = require("../middleware/assistantRateLimit");

const router = express.Router();
const allowedOrigins = new Set(
  (
    process.env.PORTFOLIO_ORIGINS ||
    "http://localhost:5173,http://127.0.0.1:5173"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

router.use((req, res, next) => {
  const origin = req.get("origin");

  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({ message: "Origin is not allowed." });
  }

  if (origin) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

router.post("/chat", assistantRateLimit, createAssistantReply);

module.exports = router;
