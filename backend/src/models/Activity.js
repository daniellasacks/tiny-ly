const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baby',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['feed', 'diaper', 'medicine', 'sleep', 'play', 'bath', 'doctor'],
    required: true
  },
  duration: {
    type: Number,
    default: null
  },
  notes: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

activitySchema.index({ babyId: 1, timestamp: -1 });

module.exports = mongoose.model('Activity', activitySchema);
