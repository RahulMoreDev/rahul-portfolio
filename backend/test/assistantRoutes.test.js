const assert = require("node:assert/strict");
const http = require("node:http");
const { test } = require("node:test");
const app = require("../src/app");

function request(endpoint, { method, headers = {}, body } = {}) {
  const url = new URL(endpoint);
  const serializedBody = body === undefined ? undefined : JSON.stringify(body);

  return new Promise((resolve, reject) => {
    const clientRequest = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method,
        headers: {
          ...headers,
          ...(serializedBody
            ? {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(serializedBody),
              }
            : {}),
        },
        agent: false,
      },
      (response) => {
        response.resume();
        response.on("end", () => resolve(response));
      },
    );

    clientRequest.on("error", reject);
    clientRequest.end(serializedBody);
  });
}

function closeServer(server) {
  const closed = new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  server.closeAllConnections();
  return closed;
}

test("assistant endpoint validates messages, reports missing configuration, and rate-limits", async () => {
  const previousApiKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;

  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();
  const endpoint = `http://127.0.0.1:${address.port}/api/assistants/chat`;

  async function post(body) {
    return request(endpoint, { method: "POST", body });
  }

  try {
    const invalid = await post({ assistant: "unknown", messages: [] });
    assert.equal(invalid.statusCode, 400);

    const valid = { assistant: "jarvis", messages: [{ role: "user", content: "Hello" }] };
    const unconfigured = await post(valid);
    assert.equal(unconfigured.statusCode, 503);

    for (let request = 0; request < 18; request += 1) {
      const response = await post({ assistant: "unknown", messages: [] });
      assert.equal(response.statusCode, 400);
    }

    const limited = await post({ assistant: "unknown", messages: [] });
    assert.equal(limited.statusCode, 429);
    assert.ok(Number(limited.headers["retry-after"]) > 0);
  } finally {
    await closeServer(server);
    if (previousApiKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previousApiKey;
  }
});

test("assistant endpoint rejects unapproved origins", async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();

  try {
    const localOrigin = await request(
      `http://127.0.0.1:${address.port}/api/assistants/chat`,
      {
        method: "OPTIONS",
        headers: { Origin: "http://127.0.0.1:5173" },
      },
    );
    assert.equal(localOrigin.statusCode, 204);

    const response = await request(`http://127.0.0.1:${address.port}/api/assistants/chat`, {
      method: "OPTIONS",
      headers: { Origin: "https://not-allowed.example" },
    });
    assert.equal(response.statusCode, 403);
  } finally {
    await closeServer(server);
  }
});
