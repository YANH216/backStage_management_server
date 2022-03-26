// 导入自定义验证规则的包
const Joi = require('joi')

// 定义用户信息数据的验证规则
const username = Joi.string().alphanum().min(4).max(10).required()
const password = Joi.string().required().min(4).max(12).required()
const phone = Joi.string().min(11).max(11)
const email = Joi.string().email()

exports.user_schema = {
  body: {
    username,
    password,
    phone,
    email,
  }
}
