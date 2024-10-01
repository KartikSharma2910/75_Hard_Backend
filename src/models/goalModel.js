const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dietPlan: {
      type: String,
      required: true,
    },
    exercisePlan: {
      type: String,
      required: true,
    },
    waterIntake: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
