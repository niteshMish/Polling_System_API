const express = require('express');
const router = express.Router();

const questionController = require('../controller/question_controller');

router.get('/',questionController.home);
router.use('/questions', require('./question'));
router.use('/options',require('./option'));
module.exports = router;