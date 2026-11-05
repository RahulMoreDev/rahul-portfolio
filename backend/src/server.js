const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = require("./app");
const connectToDatabase = require("./config/database");
const { getJwtSecret } = require("./config/auth");

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  getJwtSecret();
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exitCode = 1;
});
