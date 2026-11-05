const jwt = require("jsonwebtoken");
const {
  TOKEN_COOKIE_NAME,
  getJwtSecret,
} = require("../config/auth");

function requireAuth(req, res, next) {
  const token = req.cookies[TOKEN_COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  let secret;
  try {
    secret = getJwtSecret();
  } catch (error) {
    return next(error);
  }

  try {
    const payload = jwt.verify(token, secret);
    if (typeof payload === "string" || typeof payload.sub !== "string") {
      return res.status(401).json({ message: "Invalid or expired session" });
    }

    req.userId = payload.sub;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
}

module.exports = requireAuth;
