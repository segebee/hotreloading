const http = require("http");
const path = require("path");
const ws = require("ws");
const { watch, readFile } = require("fs").promises;
const url = require("url");

const port = "3030";
const host = "localhost";

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
};

const listener = async function (req, res) {
  const parsedUrl = url.parse(req.url);
  let filePath = path.join(
    __dirname,
    parsedUrl.pathname === "/" ? "index.html" : parsedUrl.pathname
  );
  const ext = path.extname(filePath);
  const mimeType = mimeTypes[ext] || "application/octet-stream";

  try {
    const file = await readFile(filePath);
    res.setHeader("Content-Type", mimeType);
    res.end(file);
  } catch (error) {
    res.statusCode = 404;
    res.end("File not found");
  }
};

const server = http.createServer(listener);

const wss = new ws.Server({ server });

wss.on("connection", (ws) => {
  console.log("ws server connected");

  ws.on("message", (message) => {
    console.log("message", message);
    ws.send(`Server received ${message}`);
  });

  ws.on("close", () => {
    console.log("ws server disconnected");
  });
});

const filesToWatch = ["ball.js", "index.js"];
filesToWatch.forEach(async (file) => {
  const watcher = watch(path.join(__dirname, file), { interval: 50 });
  for await (const { filename } of watcher) {
    if (filename) {
      console.log(`${filename} changed`);
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send("reload");
        }
      });
    }
  }
});

server.listen(port, host, () => {
  console.log("started");
});
