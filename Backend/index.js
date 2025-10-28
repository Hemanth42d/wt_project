require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

app.get("/", (req, res) => {
  res.json({
    message: "FarmConnect API is running!",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`FarmConnect server is running on port ${PORT}`);
  console.log(
    `Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
  );
});
