const expressJoi = require("@escook/express-joi");

const express = require("express");

const router = express.Router()

const { 
  addCategory,
  updateCategory,
  getAllCategory,
  getCategory,
} = require('../router_handler/category')

const { 
  category_schema
} = require('../schema/category')

// 定义分类基本路径
const basePath = '/manage/category'

router.post(`${basePath}/add`, expressJoi(category_schema), addCategory)

router.post(`${basePath}/update`, updateCategory)

router.get(`${basePath}/list`, getAllCategory)

router.get(`${basePath}/info`, getCategory)


module.exports = router