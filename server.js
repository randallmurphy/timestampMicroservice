const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Timestamp Microservice" });
});

// API route to handle timestamps
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  // If no date provided, use the current date
  let date = dateParam
    ? !isNaN(dateParam) 
      ? new Date(parseInt(dateParam)) 
      : new Date(dateParam)
    : new Date();

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});