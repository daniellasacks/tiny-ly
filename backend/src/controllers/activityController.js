const Activity = require('../models/Activity');
const Baby = require('../models/Baby');

exports.getActivities = async (req, res) => {
  try {
    const { babyId } = req.params;

    const baby = await Baby.findById(babyId);
    if (!baby) {
      return res.status(404).json({ message: 'Baby not found' });
    }

    if (baby.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const activities = await Activity.find({ babyId }).sort({ timestamp: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const { babyId, type, duration, notes } = req.body;

    const baby = await Baby.findById(babyId);
    if (!baby) {
      return res.status(404).json({ message: 'Baby not found' });
    }

    if (baby.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const activity = new Activity({
      babyId,
      userId: req.userId,
      type,
      duration: duration || null,
      notes: notes || null,
      timestamp: new Date()
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (activity.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
