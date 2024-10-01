const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  updateGoal,
} = require("../controllers/goalController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createGoal);
router.get("/", authMiddleware, getGoals);
router.put("/:id", authMiddleware, updateGoal);

module.exports = router;
