// 导入自定义验证规则的包
const Joi = require('joi')

// 定义用户信息数据的验证规则
const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string().required()
const phone = Joi.string()
const email = Joi.string().email()

exports.login_schema = {
  body: {
    username,
    password,
    phone,
    email,
  }
}

exports.add_schema = {
  body: {
    username,
    password,
    phone,
    email,
  }
}