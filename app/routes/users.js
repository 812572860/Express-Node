var express = require('express');
var router = express.Router();

const userController = require('../controllers/User')

router.post('/signIn', userController.signIn)
router.post('/loginIn', userController.loginIn)
router.post('/update', userController.updateUser)

module.exports = router;
