const Joi = require('joi');
const schema = Joi.object({
    name: Joi.string().min(10).required(),
    description: Joi.string().min(20).required(),
    location: Joi.string().required()
})

//schema anterior con las validaciones
function validate(body) {

    return schema.validate({
        name: body.name,
        description: body.description,
        location: body.location
    }, { abortEarly: false })
}

module.exports = {
    validate
}
