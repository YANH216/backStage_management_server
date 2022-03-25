/* users集合数据的Model */

const mongoose = require('mongoose');

// 导入密码加密模块
const bcrypt = require('bcryptjs')


// 定义schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  email: String,
  create_time: { type: Number, default: Date.now },
  role_id: String,
})

// 定义Model
const userModel = mongoose.model('users', userSchema)

// 初始化默认超级管理员用户
userModel.findOne({ username: 'admin' }).then(user => {
  if (!user) {
    userModel.create({ 
      username: 'admin', 
      password: bcrypt.hashSync('admin', 10)
    }).then(user => {
      console.log('初始化用户: 用户名: admin 密码： admin')
    })
  }
})

// 向外暴露Model
module.exports = userModel