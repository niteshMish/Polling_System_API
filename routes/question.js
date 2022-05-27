const express = require('express');
const router = express.Router();

const questionController = require('../controller/question_controller');

router.get('/:id',questionController.show);
router.post('/create',questionController.create );
router.get('/:id/delete' ,questionController.delete);
router.use('/:id/options' , require('./option'));
module.exports = router;