const express = require('express')
const { loginUser, signupUser, getAllUser } = require('../controllers/userController')

const router = express.Router()

// get all user
router.get('/', getAllUser)


// login
router.post('/login', loginUser)

// sign up
router.post('/signup', signupUser)

module.exports = router