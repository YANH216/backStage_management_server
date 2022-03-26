const Joi = require("joi");

const categoryId = Joi.string().required()

const pCategoryId = Joi.string().required()

const name = Joi.string().required()

const price = Joi.number().required()

const desc = Joi.string()

const status = Joi.number().default(1)

const imgs = Joi.array().default([])

const detail = Joi.string()

exports.product_schema = {
  
}
