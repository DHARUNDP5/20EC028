const express = require('express')
const router = express.Router()
const { register, auth, trains, train } = require('../controllers/trainController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/auth', auth)
router.get('/trains', protect, trains)
router.get('/train/:id', protect, train)

module.exports = router