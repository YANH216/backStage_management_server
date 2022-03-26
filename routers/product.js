const expressJoi = require("@escook/express-joi");

const express = require("express");

const router = express.Router()

const { 
  addProduct,
  getProductList,
  searchProductList,
  updateProduct,
  updateStatus,
} = require('../router_handler/product')

const { 
  product_schema,
} = require('../schema/product')

// 定义通用请求路径
const basePath = '/manage/product'

router.post(`${basePath}/add`, expressJoi(product_schema), addProduct)

router.get(`${basePath}/list`, getProductList)

router.get(`${basePath}/search`, searchProductList)

router.post(`${basePath}/update`, updateProduct)

router.post(`${basePath}/updateStatus`, updateStatus)

module.exports = router