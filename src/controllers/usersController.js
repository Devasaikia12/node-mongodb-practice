const { createIndexes } = require('../models/usersModel')
const User = require('../models/usersModel')
const { use } = require('../routes/userRoutes')
const generateToken = require('../uttils/generateToken')
const { sendMail } = require('../emails/account')

const registerUser = async(req, res) => {
    const { name, email, password } = req.body
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).send({ message: 'User already exist' })
        }
        const user = await User.create({
            name,
            email,
            password,
        })
        if (user) {
            res.status(201).send({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })

            sendMail({
                email: user.email,
                subject: 'Wellcome to Node App',
                text: `Wellcome to the app ${user.name}. Let me know how you get along the way.`,
            })
        }
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

const findUser = async(req, res) => {
    try {
        const id = req.params.id
        const users = await User.findById(id)
        if (users) {
            res.status(200).send(users)
        } else {
            res.status(404).send({ message: 'user not found' })
        }
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        const matchPassword = await user.matchPassword(password)
        if (user && matchPassword) {
            res.status(200).send({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        } else {
            res.status(404).send({ message: 'Invalid email or password' })
        }
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}
const userProfile = async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(404).send({ message: 'user not found' })
    }
}
module.exports = { findUser, registerUser, login, userProfile }