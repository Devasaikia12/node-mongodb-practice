const joi = require('joi')
const errorHandler = require('../uttils/errorFunction')

const validation = joi.object({
    name: joi.string().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(6).trim(true).required(),
})

const userValidation = async(req, res, next) => {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    const { error } = validation.validate(payload)
    if (error) {
        res.status(406)
        return res.json(errorHandler(true, `Error in User Data : ${error.message}`))
    } else {
        next()
    }
}
module.exports = userValidation