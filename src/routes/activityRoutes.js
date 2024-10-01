const express = require("express");
const {
  logActivity,
  getActivities,
} = require("../controllers/activityController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, logActivity);
router.get("/", authMiddleware, getActivities);

module.exports = router;
