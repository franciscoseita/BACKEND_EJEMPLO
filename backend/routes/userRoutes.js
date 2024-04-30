const express = require('express');
const router = express.Router();
const {protect} =require('../middleware/authMiddleware')

const {login,registrar,mostrar} = require('../controllers/userController')
router.post('/login',login)
router.post('/register',registrar)
router.get('/data',protect,mostrar)



module.exports = router