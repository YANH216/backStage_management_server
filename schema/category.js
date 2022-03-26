const Joi = require("joi");

const categoryName = Joi.string().required()
const parentId = Joi.string().required().default(0)


exports.category_schema = {
  body: {
    categoryName,
    parentId
  }
}