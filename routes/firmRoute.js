const express = require('express')
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router()

router.post('/addFirm', verifyToken, firmController.addFirm)
router.delete('/:firmId', firmController.deleteFirm)

module.exports = router