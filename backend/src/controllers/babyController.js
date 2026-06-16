const Baby = require('../models/Baby');

exports.getBabies = async (req, res) => {
  try {
    const babies = await Baby.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(babies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBaby = async (req, res) => {
  try {
    const baby = await Baby.findById(req.params.id);

    if (!baby) {
      return res.status(404).json({ message: 'Baby not found' });
    }

    if (baby.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(baby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBaby = async (req, res) => {
  try {
    const { name, dateOfBirth, gender, currentWeight } = req.body;

    const baby = new Baby({
      userId: req.userId,
      name,
      dateOfBirth,
      gender,
      currentWeight: currentWeight || null
    });

    await baby.save();
    res.status(201).json(baby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBaby = async (req, res) => {
  try {
    const { name, currentWeight } = req.body;
    const baby = await Baby.findById(req.params.id);

    if (!baby) {
      return res.status(404).json({ message: 'Baby not found' });
    }

    if (baby.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (name) baby.name = name;
    if (currentWeight !== undefined) baby.currentWeight = currentWeight;

    await baby.save();
    res.json(baby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBaby = async (req, res) => {
  try {
    const baby = await Baby.findById(req.params.id);

    if (!baby) {
      return res.status(404).json({ message: 'Baby not found' });
    }

    if (baby.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Baby.findByIdAndDelete(req.params.id);
    res.json({ message: 'Baby deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
