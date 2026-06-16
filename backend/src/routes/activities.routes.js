const express = require('express');
const auth = require('../middleware/auth');
const {
  getActivities,
  createActivity,
  deleteActivity
} = require('../controllers/activityController');

const router = express.Router();

router.use(auth);

router.get('/:babyId', getActivities);
router.post('/', createActivity);
router.delete('/:id', deleteActivity);

module.exports = router;
