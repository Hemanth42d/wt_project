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
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, etc.)
      if (!origin) return callback(null, true);

      // Get the allowed origin from environment
      const allowedOrigin = process.env.FRONTEND_URL;

      // Check if origin matches (with or without trailing slash)
      if (
        origin === allowedOrigin ||
        origin === allowedOrigin.replace(/\/$/, "") ||
        origin === allowedOrigin + "/"
      ) {
        return callback(null, true);
      }

      // Allow localhost for development
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }

      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    },
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
