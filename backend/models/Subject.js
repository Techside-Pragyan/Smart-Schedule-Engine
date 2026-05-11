const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  color: { type: String, default: '#4F46E5' }, // Default Indigo
  difficulty: { type: Number, min: 1, max: 5, default: 3 }, // 1: Easy, 5: Hard
  topics: [{
    name: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    priority: { type: Number, default: 1 }
  }],
  examDate: { type: Date }
});

module.exports = mongoose.model('Subject', subjectSchema);
