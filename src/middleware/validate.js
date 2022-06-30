const Joi = require('joi')

const middleware = (schema, property) => {
    return (req, res, next) => {
        const { error } = Joi.validate(req.body, schema)
    }
}