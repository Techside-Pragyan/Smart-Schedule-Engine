const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  preferences: {
    sleepSchedule: {
      wakeUp: { type: String, default: "07:00" },
      sleep: { type: String, default: "23:00" }
    },
    breakDuration: { type: Number, default: 15 }, // in minutes
    productivityHours: [{ type: String }], // e.g., ["Morning", "Late Night"]
    dailyStudyGoal: { type: Number, default: 4 } // in hours
  },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
