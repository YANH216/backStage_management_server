const Joi = require("joi");

const name = Joi.string().required()

const auth_name = Joi.string()

const auth_time = Joi.number()

const create_time = Joi.number().default(Date.now)

const menus = Joi.array()

exports.role_schema = {
  body: {
    
  }
}