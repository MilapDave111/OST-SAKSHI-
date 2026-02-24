const express = require("express");
const axios = require("axios");
const https = require("https");

const app = express();

/*
  Force IPv4 because many college / hostel / lab networks
  fail TLS over IPv6 → causes Axios AggregateError
*/
const agent = new https.Agent({
  family: 4
});

// Home Route
app.get("/", (req, res) => {
  res.send("Hello Open Source Lab");
});

// JSON Route
app.get("/api/info", (req, res) => {
  res.json({
    name: "NPM Lab",
    subject: "Open Source Technology",
    semester: "BE 6th Sem"
  });
});

// Axios Demo Route (FIXED)
app.get("/api/user", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1",
      { httpsAgent: agent }
    );

    res.json(response.data);

  } catch (error) {
    console.error("Axios Error:", error.message);

    res.status(500).json({
      error: "Failed to fetch user from external API",
      reason: error.message
    });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
