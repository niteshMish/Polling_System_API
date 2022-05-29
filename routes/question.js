const express = require('express');
const router = express.Router();

const questionController = require('../controller/question_controller');
const  optionController = require('../controller/option_controller')
router.get('/:id',questionController.show);
router.post('/create',questionController.create );
router.get('/:id/delete' ,questionController.delete);
router.post('/:id/options/create',optionController.create );
module.exports = router;