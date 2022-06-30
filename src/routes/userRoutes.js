const express = require('express')
const auth = require('../middleware/authMiddleware')
const {
    login,
    registerUser,
    findUser,
    userProfile,
} = require('../controllers/usersController')
const router = express.Router()
    //---import validation
const userValidation = require('../helper/validator')

router.get('/finduser/:id', findUser)
router.post('/', userValidation, registerUser)
router.post('/login', login)
router.route('/profile').get(auth, userProfile)

module.exports = router