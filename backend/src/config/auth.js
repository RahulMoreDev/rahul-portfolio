const TOKEN_COOKIE_NAME = "authToken";
const TOKEN_MAX_AGE_MS = 60 * 60 * 1000;

function getJwtSecret() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error(
      "JWT_SECRET must be set to a random value of at least 32 characters in backend/.env."
    );
  }

  return process.env.JWT_SECRET;
}

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_MAX_AGE_MS,
  };
}

module.exports = {
  TOKEN_COOKIE_NAME,
  TOKEN_MAX_AGE_MS,
  getCookieOptions,
  getJwtSecret,
};
