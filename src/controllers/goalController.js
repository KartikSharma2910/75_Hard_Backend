const Goal = require("../models/goalModel");

const createGoal = async (req, res) => {
  const { dietPlan, exercisePlan, waterIntake } = req.body;

  const goal = new Goal({
    userId: req.user._id,
    dietPlan,
    exercisePlan,
    waterIntake,
  });

  await goal.save();
  res.status(201).json(goal);
};

const getGoals = async (req, res) => {
  const goals = await Goal.find({ userId: req.user._id });
  res.status(200).json(goals);
};

const updateGoal = async (req, res) => {
  const { dietPlan, exercisePlan, waterIntake, progress } = req.body;
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({ message: "Goal not found" });
  }

  if (goal.userId.toString() !== req.user._id.toString()) {
    return res
      .status(401)
      .json({ message: "Unauthorized to update this goal" });
  }

  goal.dietPlan = dietPlan || goal.dietPlan;
  goal.exercisePlan = exercisePlan || goal.exercisePlan;
  goal.waterIntake = waterIntake || goal.waterIntake;
  goal.progress = progress !== undefined ? progress : goal.progress;

  const updatedGoal = await goal.save();
  res.json(updatedGoal);
};

module.exports = { createGoal, getGoals, updateGoal };
