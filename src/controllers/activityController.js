const Activity = require("../models/activityModel");

// Log a new activity
const logActivity = async (req, res) => {
  const { goalId, completed } = req.body;

  const activity = new Activity({
    userId: req.user._id,
    goalId,
    completed,
  });

  await activity.save();
  res.status(201).json(activity);
};

// Get all activities for the logged-in user
const getActivities = async (req, res) => {
  const activities = await Activity.find({ userId: req.user._id }).populate(
    "goalId"
  );
  res.json(activities);
};

module.exports = { logActivity, getActivities };
