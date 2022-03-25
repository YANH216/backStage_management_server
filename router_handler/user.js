const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const userModel = require('../models/user')
const roleModel = require('../models/role')

const { 
  jwtSecretKey, 
  expiresIn 
} = require('../config/tokenConf')
const router = require('../routers/user')

// 登录
exports.login = (req, res) => {
  const { username, password } = req.body
  // 根据username 和 password查询数据users, 如果没有, 返回提示错误信息, 如果有, 返回登陆成功信息(包含user)
  userModel.findOne({ username })
    .then(user => {
      if (user) {
        // 将找到的用户加密密码与请求过来的密码进行对比
        const compareResult = bcrypt.compareSync(password, user.password)
        if (compareResult) { // 登陆成功
          // 清空用户信息中的敏感信息,密码
          const newUser = { ...user, password: '' }
          // 对用户信息进行加密,生成token字符串
          const tokenStr = jwt.sign(newUser, jwtSecretKey, { expiresIn })
          // 查看该用户是否有角色属性
          if (user.role_id) {
            roleModel.findOne({ _id: user.role_id })
              .then(role => {
                user._doc.role = role
                console.log('role user', user)
                res.send({ status: 0, data: user })
              })
          } else {
            user._doc.role = { menu: [] }
            // 返回登录成功信息(包含user)
            res.send({
              status: 0,
              msg: '登录成功',
              data: user,
              token: 'Bearer ' + tokenStr,
            })
          }
        } else {  // 登录失败
          res.cc('用户名或密码不正确!')
        }
      }
    })
    .catch(err => {
      console.log('登录异常', err)
      res.cc('登录异常,请稍再试')
    })
}

// 添加用户
exports.add = (req, res) => {
  // 读取请求参数数据
  const { username, password } = req.body
  // 处理: 判断用户是否存在,如果存在,返回错误信息,如果不存在,保存
  // 查询(根据username)
  userModel.findOne({ username })
    .then(user => {
      // 如果user有值(已存在)并提示用户已存在
      if (user) {
        res.cc('此用户已存在')
        return new Promise(() => {
        })
      } else {  // user没值  不return 下面的.then没有值
        return userModel.create({...req.body, password: bcrypt.hashSync(password, 10),}) 
      }  
    })
    .then(user => {
      console.log(user)
      // 返回包含user的json数据
      res.send({ status: 0, data: user })
    })
    .catch(err => {
      console.log('注册异常', err)
      res.cc('添加用户异常,请重新尝试')
    })
}