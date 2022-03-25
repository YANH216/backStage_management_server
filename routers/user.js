const express = require('express');

// 创建路由对象
const router = express.Router()

const { 
  login,
  add,
}  = require('../router_handler/user')


// 导入验证表单数据中间件
const expressJoi = require('@escook/express-joi')

const {
  login_schema,
  add_schema,
} = require('../schema/user')

// 登录
router.post('/login', expressJoi(login_schema), login)

// 添加用户/用户注册
router.post('/user/add', expressJoi(add_schema), add)

module.exports = router