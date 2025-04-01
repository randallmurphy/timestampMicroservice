const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Timestamp Microservice is running!" });
});

// Timestamp API route
app.get("/api/", (req, res) => {
  let { date } = req.params; // Get the date parameter

  let parsedDate;

  // If no date is provided, return current time
  if (!date) {
    parsedDate = new Date();
  } 
  // If the date is a Unix timestamp (numeric), parse it correctly
  else if (!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } 
  // Otherwise, treat it as a normal date string
  else {
    parsedDate = new Date(date);
  }

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Send response
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});