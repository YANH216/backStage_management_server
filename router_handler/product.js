const res = require("express/lib/response")
const productModel = require("../models/product")


// 添加产品
exports.addProduct = (req, res) => {
  const product = req.body
  productModel.create(product)
    .then(product => {
      res.send({ status: 0, data: product })
    })
    .catch(err => {
      console.error('添加产品异常', err)
      res.cc('添加产品异常，请重新尝试')
    })
}


// 获取产品分页列表
exports.getProductList = (req, res) => {
  const { pageNum, pageSize } = req.query
  productModel.find({})
    .then(products => {
      res.send({ status: 0, data: pageFilter(products, pageNum, pageSize ) })
    })
    .catch(err => {
      console.error('获取商品列表异常', err);
      res.cc('获取商品列表异常，请重新尝试')
    })
}

// 搜索产品列表
exports.searchProductList = (req, res) => {
  const { 
    pageNum, 
    pageSize, 
    searchName, 
    productName, 
    product, 
    productDesc 
  } = req.query

let contition = {}
if (productName) {
  contition = {name: new RegExp(`^.*${productName}.*$`)}
} else if (productDesc) {
  contition = {desc: new RegExp(`^.*${productDesc}.*$`)}
}
productModel.find(contition)
  .then(products => {
    res.send({ status: 0, data: pageFilter(products, pageNum,pageSize) })
  })
  .catch(err => {
    console.error('搜索商品列表异常', err);
    res.cc('搜索商品列表异常，请重新尝试')
  })
}

// 更新产品
exports.updateProduct = (req, res) => {
  const product = req.body
  productModel.findOneAndUpdate({ _id: product._id }, product)
    .then(preProduct => {
      res.send({ status: 0 })
    })
    .catch(err => {
      console.error('更新商品异常', err);
      res.cc('更新商品名称异常，请重新尝试')
    })
}

// 更新商品状态(上架/下架)
exports.updateStatus = (req, res) => {
  const { productId, status } = req.body
  productModel.findOneAndUpdate({ _id: productId }, { status })
    .then(preProduct => {
      res.send({ status: 0 })
    })
    .catch(err => {
      console.error('更新商品状态异常', err);
      res.cc('更新商品状态异常，请重新尝试')
    })
}

// 得到指定数组的分页信息对象的函数
const pageFilter = (arr, pageNum, pageSize) => {
  pageNum = pageNum * 1
  pageSize = pageSize * 1
  const total = arr.length
  const pages = Math.floor((total + pageSize -1 ) / pageSize)
  const start = pageSize * (pageNum - 1)
  const end = start + pageSize <= total ? start + pageSize : total
  const list = []
  for (let i = start; i < end; i++) {
    list.push(arr[i])
  }

  return {
    pageNum,
    total,
    pages,
    pageSize,
    list
  }
}