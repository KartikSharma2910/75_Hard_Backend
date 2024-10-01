const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./src/routes/authRoutes");
const goalRoutes = require("./src/routes/goalRoutes");
const activityRoutes = require("./src/routes/activityRoutes");

const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/activities", activityRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
