const express = require('express');
const router = express.Router();
const attendantsController = require('../controllers/attendantsController');

router.post('/attendants', attendantsController.createAttendant);
router.get('/attendants/:email', attendantsController.getAttendant);
router.put('/attendants/:email', attendantsController.updateAttendant);
router.delete('/attendants/:email', attendantsController.deleteAttendant);

module.exports = router;
