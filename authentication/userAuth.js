const joi1 = require("@hapi/joi")
const joi = require("joi-oid")

const userAuth = joi.object({
    firstName: joi.string().lowercase().required().trim(),
    lastName: joi.string().lowercase().required().trim(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().email(),
    password: joi.string().min(8).max(36).required()
})

module.exports = userAuth