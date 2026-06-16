const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// Placeholder for future medicine endpoints
router.get('/:babyId', (req, res) => {
  res.json([]);
});

module.exports = router;
