import * as Joi from 'joi';


const schemas = {
    
create: Joi.object().keys(
    {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required()
}),

update: Joi.object().keys(
    {
        id: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required(),
}),
getOne: Joi.object().keys({
    email: Joi.string().email().required()
}),
delete: Joi.object().keys({
    id: Joi.number().required()
}),
}

export default schemas;