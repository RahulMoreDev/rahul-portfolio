const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const assistantRoutes = require("./routes/assistantRoutes");

const app = express();

app.use(express.json({ limit: "64kb" }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/assistants", assistantRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error);
  const statusCode =
    error.code === 11000
      ? 409
      : error.status === 413
        ? 413
        : error.name === "ValidationError" || error instanceof SyntaxError
          ? 400
          : 500;
  const message =
    statusCode === 409
      ? "That username is already taken"
      : statusCode === 413
        ? "Request body is too large"
        : statusCode === 400
          ? "Invalid request"
          : "Internal server error";

  res.status(statusCode).json({ message });
});

module.exports = app;
