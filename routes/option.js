const express = require('express');
const router = express.Router();

const optionController = require('../controller/option_controller');


router.post('/create',optionController.create );
router.get('/:id/delete' ,optionController.delete);
router.get('/:id/add_vote' , optionController.addVote);


module.exports = router;