const express = require('express');

// 创建路由对象
const router = express.Router()

const { 
  login,
  addUser,
  updateUser,
  deleteUser,
  getAllUser,
}  = require('../router_handler/user')


// 导入验证表单数据中间件
const expressJoi = require('@escook/express-joi')

const {
  user_schema
} = require('../schema/user')

// 定义请求基本路径
const basePath = '/manage/user'

// 登录
router.post('/login', expressJoi(user_schema), login)

// 添加用户
router.post(`${basePath}/add`, expressJoi(user_schema), addUser)

// 更新用户
router.post(`${basePath}/update`, updateUser)

// 删除用户
router.post(`${basePath}/delete`, deleteUser)

// 获取所有用户列表
router.get(`${basePath}/list`, getAllUser)

module.exports = router