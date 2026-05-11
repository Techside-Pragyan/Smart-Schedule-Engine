const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  schedule: [{
    day: { type: String, required: true }, // e.g., "Monday"
    date: { type: Date, required: true },
    sessions: [{
      startTime: { type: String, required: true }, // "HH:mm"
      endTime: { type: String, required: true },
      subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
      topic: { type: String },
      type: { type: String, enum: ['study', 'break', 'revision'], default: 'study' },
      status: { type: String, enum: ['pending', 'completed', 'missed'], default: 'pending' },
      notes: { type: String }
    }]
  }],
  isAdaptive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timetable', timetableSchema);
