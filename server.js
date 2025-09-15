const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ---- MCP metadata ----
app.get("/tools", (req, res) => {
  res.json([
    {
      name: "echoTool",
      description: "Echoes back the input text",
      args: {
        text: { type: "string", description: "Text to echo back" }
      }
    },
    {
      name: "addNumbers",
      description: "Adds two numbers",
      args: {
        a: { type: "number", description: "First number" },
        b: { type: "number", description: "Second number" }
      }
    }
  ]);
});


// ---- Generic Call Tool ----
app.post("/call-tool", async (req, res) => {
  const { tool, args } = req.body;

  try {
    if (tool === "echoTool") {
      return res.json({ result: `You said: ${args.text}` });
    }

    if (tool === "addNumbers") {
      const sum = (Number(args.a) || 0) + (Number(args.b) || 0);
      return res.json({ result: `Sum of ${args.a} + ${args.b} = ${sum}` });
    }

    return res.status(400).json({ error: "Unknown tool" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ MCP Server running on port ${PORT}`);
});


