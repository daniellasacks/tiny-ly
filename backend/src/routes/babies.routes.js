const express = require('express');
const auth = require('../middleware/auth');
const {
  getBabies,
  getBaby,
  createBaby,
  updateBaby,
  deleteBaby
} = require('../controllers/babyController');

const router = express.Router();

router.use(auth);

router.get('/', getBabies);
router.get('/:id', getBaby);
router.post('/', createBaby);
router.put('/:id', updateBaby);
router.delete('/:id', deleteBaby);

module.exports = router;
