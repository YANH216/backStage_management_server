/* 操作products集合数据的Model */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  categoryId: { type: String, required: true },  // 所属分类ID
  pCategoryId: { type: String, required: true }, // 所属分类的父分类ID
  name: { type: String, required: true },  // 名称
  price: { type: Number, required: true }, // 价格
  desc: { type: String },  // 描述
  status: { type: Number, default: 1 },  // 商品状态: 1:在售 2: 下架
  imgs: { type: Array, default: [] },   // 多个图片文件名的json字符串
  detail: { type: String }  // 商品详情
})


const productModel = mongoose.model('products', productSchema)

module.exports = productModel