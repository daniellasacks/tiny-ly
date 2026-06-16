const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: null
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    default: null
  },
  code: {
    type: String,
    default: null
  },
  fullName: {
    type: String,
    trim: true,
    default: null
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    default: null
  },
  password: {
    type: String,
    minlength: 6,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.password) return next();
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
