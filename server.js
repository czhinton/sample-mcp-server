const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ---- MCP metadata ----
app.get("/tools", (req, res) => {
  res.json({
    tools: [
      {
        name: "echoTool",
        description: "Echoes back the input text",
        endpoint: "/run/echo"
      },
      {
        name: "addNumbers",
        description: "Adds two numbers",
        endpoint: "/run/add"
      }
    ]
  });
});

// ---- Tool 1: Echo ----
app.post("/run/echo", (req, res) => {
  const { text } = req.body;
  res.json({ output: `You said: ${text}` });
});

// ---- Tool 2: Add Numbers ----
app.post("/run/add", (req, res) => {
  const { a, b } = req.body;
  const sum = (Number(a) || 0) + (Number(b) || 0);
  res.json({ output: `Sum of ${a} + ${b} = ${sum}` });
});

// ---- Start server ----
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ MCP Server running at http://localhost:${PORT}`);
});
