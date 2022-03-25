/* 操作categorys 集合数据的Model */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentId: { type: String, required: true, default: 0 },
})

const categoryModel = mongoose.model('categorys', categorySchema)

module.exports = categoryModel