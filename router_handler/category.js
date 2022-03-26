const categoryModel = require("../models/category")

// 添加分类
exports.addCategory = (req, res) => {
  const { categoryName, parentId } = req.body
  categoryModel.create({ name: categoryName, parentId: parentId || '0' })
    .then(category => {
      res.send({ status: 0, data: category })
    })
    .catch(err => {
      console.error('添加分类异常', err);
      res.cc('添加分类异常，请重新尝试')
    })
}

// 更新分类
exports.updateCategory =  (req, res) => {
  const { categoryId, categoryName } = req.body
  categoryModel.findOneAndUpdate({ _id: categoryId }, { name: categoryName })
    .then(preCategory => {
      res.send({ status: 0 })
    })
    .catch(err => {
      console.error('更新分类名称异常', err);
      res.cc('更新分类名称异常，请重新尝试')
    })
}


// 获取分类列表
exports.getAllCategory = (req, res) => {
  const parentId = req.query.parentId || '0'
  categoryModel.find({ parentId })
    .then(categories => {
      res.send({ status: 0, data: categories })
    })
    .catch(err => {
      console.error('获取分类列表异常', err);
      res.cc('获取分类列表异常，请重新尝试')
    })
}


// 根据分类ID获取分类
exports.getCategory = (req, res) => {
  const categoryId = req.query.categoryId
  categoryModel.findOne({ _id: categoryId })
    .then(category => {
      res.send({ status: 0, data: category })
    })
    .catch(err => {
      console.error('获取分类信息异常', err);
      res.cc('获取分类信息异常，请重新尝试')
    })
}

