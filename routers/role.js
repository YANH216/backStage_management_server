const expressJoi = require("@escook/express-joi");

const express = require("express");

expressJoi

const router = express.Router()

const { 
  addRole,
  getRoleList,
  roleUpdate,
} = require('../router_handler/role')


// schema文件中 已经定义好各属性的规范，只需在schema文件中添加即可
const {
  role_schema,
} = require('../schema/role')

// 定义请求基本路径
const basePath = '/manage/role'

router.post(`${basePath}/add`, addRole)

router.get(`${basePath}/list`, getRoleList)

router.post(`${basePath}/update`, roleUpdate)

module.exports = router