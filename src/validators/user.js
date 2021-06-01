const Joi = require('joi');
const schema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string()
        .email().required(),
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
    role: Joi.string().required().valid('company', 'user')
})

//schema anterior con las validaciones
function validate(body) {

    return schema.validate({
        email: body.email,
        password: body.password,
        name: body.name,
        surname: body.surname,
        role: body.role
    }, { abortEarly: false })
}

module.exports = {
    validate
}
